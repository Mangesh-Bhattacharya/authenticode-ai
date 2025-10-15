# AuthentiCode AI - API Documentation

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend-url.com`

## Authentication
All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### POST /api/auth/signup
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "credits": 15,
    "is_premium": false
  }
}
```

#### POST /api/auth/signin
Sign in to existing account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** Same as signup

### AI Detection

#### POST /api/detect/analyze
Analyze text or code for AI generation.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data` (for file upload)
- `Content-Type: application/json` (for text input)

**Request Body (Text):**
```json
{
  "content": "def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)",
  "content_type": "code",
  "language": "python"
}
```

**Request Body (File Upload):**
```
FormData:
- file: <uploaded_file>
- content_type: "code" | "text"
- language: "python" | "javascript" | "java" | "cpp" | "text"
```

**Response:**
```json
{
  "confidence_score": 85.5,
  "human_likelihood": 14.5,
  "analysis": {
    "gptzero_score": 82.0,
    "copyleaks_score": 89.0,
    "hive_score": 85.5,
    "combined_score": 85.5
  },
  "explanation": "Consistent token entropy and syntax structure indicate AI generation",
  "credits_remaining": 14,
  "detection_id": "uuid"
}
```

### Credits Management

#### GET /api/credits/balance
Get current credit balance.

**Response:**
```json
{
  "credits": 14,
  "is_premium": false,
  "subscription_status": null
}
```

#### GET /api/credits/transactions
Get credit transaction history.

**Query Parameters:**
- `limit`: Number of transactions (default: 10)
- `offset`: Pagination offset (default: 0)

**Response:**
```json
{
  "transactions": [
    {
      "id": "uuid",
      "amount": -1,
      "transaction_type": "detection",
      "description": "AI detection analysis",
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

### Payment Processing

#### POST /api/payment/create-checkout
Create Stripe checkout session.

**Request Body:**
```json
{
  "price_id": "price_1234567890",
  "success_url": "https://yourapp.com/success",
  "cancel_url": "https://yourapp.com/cancel"
}
```

**Response:**
```json
{
  "checkout_url": "https://checkout.stripe.com/pay/cs_test_..."
}
```

#### POST /api/payment/webhook
Stripe webhook endpoint (internal use).

### Detection History

#### GET /api/history/detections
Get user's detection history.

**Query Parameters:**
- `limit`: Number of results (default: 10)
- `offset`: Pagination offset (default: 0)
- `content_type`: Filter by type ("code" | "text")

**Response:**
```json
{
  "detections": [
    {
      "id": "uuid",
      "content_type": "code",
      "file_name": "example.py",
      "confidence_score": 85.5,
      "created_at": "2024-01-15T10:30:00Z"
    }
  ],
  "total": 1
}
```

#### GET /api/history/detections/{detection_id}
Get detailed detection result.

**Response:**
```json
{
  "id": "uuid",
  "content_type": "code",
  "file_name": "example.py",
  "confidence_score": 85.5,
  "analysis_result": {
    "gptzero_score": 82.0,
    "copyleaks_score": 89.0,
    "hive_score": 85.5,
    "explanation": "Detailed analysis..."
  },
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Error Responses

All endpoints return errors in this format:
```json
{
  "detail": "Error message",
  "error_code": "SPECIFIC_ERROR_CODE"
}
```

### Common Error Codes
- `INSUFFICIENT_CREDITS`: User has no credits remaining
- `INVALID_FILE_TYPE`: Unsupported file format
- `FILE_TOO_LARGE`: File exceeds size limit
- `RATE_LIMIT_EXCEEDED`: Too many requests
- `INVALID_TOKEN`: Authentication token invalid
- `USER_NOT_FOUND`: User account not found

## Rate Limits
- **Free users**: 10 requests per minute
- **Premium users**: 100 requests per minute

## File Upload Limits
- **Max file size**: 10MB
- **Supported formats**: .py, .js, .java, .cpp, .txt
- **Content types**: text/plain, text/x-python, application/javascript, text/x-c, text/x-java-source, text/x-c++src