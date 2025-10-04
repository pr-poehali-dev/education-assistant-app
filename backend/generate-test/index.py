import json
import os
from typing import Dict, Any, List
from pydantic import BaseModel, Field

class TestQuestion(BaseModel):
    question: str
    options: List[str]
    correctAnswer: int

class TestRequest(BaseModel):
    topic: str = Field(..., min_length=1)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Generates educational test questions using OpenAI API
    Args: event with httpMethod, body containing topic
          context with request_id
    Returns: HTTP response with generated test questions
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    test_request = TestRequest(**body_data)
    
    api_key = os.environ.get('OPENAI_API_KEY')
    if not api_key:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'OpenAI API key not configured'}),
            'isBase64Encoded': False
        }
    
    try:
        import requests
        
        prompt = f"""Создай тест по теме: {test_request.topic}

Требования:
- Создай ровно 5 вопросов
- К каждому вопросу 4 варианта ответа
- Вопросы должны соответствовать уровню обучения из запроса (если указан класс)
- Вопросы должны проверять понимание темы

Формат ответа - строго JSON массив объектов:
[
  {{
    "question": "Текст вопроса?",
    "options": ["Вариант 1", "Вариант 2", "Вариант 3", "Вариант 4"],
    "correctAnswer": 0
  }}
]

где correctAnswer - индекс правильного ответа (0-3).

Верни ТОЛЬКО JSON, без дополнительного текста."""

        response = requests.post(
            'https://api.openai.com/v1/chat/completions',
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json'
            },
            json={
                'model': 'gpt-4o-mini',
                'messages': [
                    {'role': 'system', 'content': 'Ты помощник для создания образовательных тестов. Отвечай только валидным JSON.'},
                    {'role': 'user', 'content': prompt}
                ],
                'temperature': 0.7,
                'max_tokens': 2000
            },
            timeout=30
        )
        
        if response.status_code != 200:
            return {
                'statusCode': response.status_code,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'error': f'OpenAI API error: {response.text}'}),
                'isBase64Encoded': False
            }
        
        ai_response = response.json()
        content = ai_response['choices'][0]['message']['content'].strip()
        
        if content.startswith('```json'):
            content = content[7:]
        if content.startswith('```'):
            content = content[3:]
        if content.endswith('```'):
            content = content[:-3]
        content = content.strip()
        
        questions = json.loads(content)
        
        validated_questions = []
        for i, q in enumerate(questions):
            validated_questions.append({
                'id': i + 1,
                'question': q['question'],
                'options': q['options'],
                'correctAnswer': q['correctAnswer']
            })
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'questions': validated_questions,
                'topic': test_request.topic
            }),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': f'Failed to parse AI response: {str(e)}'}),
            'isBase64Encoded': False
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }
