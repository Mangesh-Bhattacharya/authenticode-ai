# Contributing to AuthentiCode AI

## 🤝 Welcome Contributors!

We're excited to have you contribute to AuthentiCode AI! This guide will help you get started.

## 🚀 Quick Start

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/authenticode-ai.git
   cd authenticode-ai
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🏗️ Development Setup

### Prerequisites
- Node.js 18+
- Python 3.9+
- Git

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## 📝 Code Style

### Frontend (TypeScript/React)
- Use TypeScript for all new files
- Follow React hooks patterns
- Use Tailwind CSS for styling
- Prefer functional components
- Use meaningful component and variable names

### Backend (Python)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Use async/await for I/O operations
- Handle errors gracefully

### General Guidelines
- Write clear, self-documenting code
- Add comments for complex logic
- Keep functions small and focused
- Use consistent naming conventions

## 🧪 Testing

### Frontend Tests
```bash
cd frontend
npm run test
```

### Backend Tests
```bash
cd backend
pytest
```

### Test Coverage
- Aim for 80%+ test coverage
- Write unit tests for utilities
- Write integration tests for APIs
- Test error scenarios

## 📋 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new features
3. **Ensure all tests pass**
4. **Update CHANGELOG.md**
5. **Create descriptive PR title**
6. **Fill out PR template**

### PR Title Format
```
type(scope): description

Examples:
feat(detection): add GPT-4 model detection
fix(auth): resolve token expiration issue
docs(api): update endpoint documentation
```

## 🐛 Bug Reports

Use the bug report template and include:
- Clear description
- Steps to reproduce
- Expected vs actual behavior
- Environment details
- Screenshots if applicable

## 💡 Feature Requests

Use the feature request template and include:
- Problem description
- Proposed solution
- Alternative solutions considered
- Additional context

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `priority-high`: Critical issues
- `priority-low`: Nice to have

## 🔒 Security

- Report security vulnerabilities privately
- Don't commit sensitive data
- Use environment variables for secrets
- Follow security best practices

## 📚 Resources

- [React Documentation](https://react.dev)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe API](https://stripe.com/docs/api)

## 🎯 Areas for Contribution

### High Priority
- [ ] Batch file processing
- [ ] API rate limiting improvements
- [ ] Mobile responsive design
- [ ] Error handling enhancements

### Medium Priority
- [ ] Dark mode improvements
- [ ] Accessibility features
- [ ] Performance optimizations
- [ ] Additional file format support

### Low Priority
- [ ] UI animations
- [ ] Advanced analytics
- [ ] Social features
- [ ] Internationalization

## 🏆 Recognition

Contributors will be:
- Added to CONTRIBUTORS.md
- Mentioned in release notes
- Invited to contributor Discord
- Eligible for contributor swag

## 📞 Getting Help

- **Discord**: Join our contributor channel
- **GitHub Discussions**: Ask questions
- **Email**: contribute@authenticode.ai
- **Office Hours**: Fridays 2-4 PM EST

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AuthentiCode AI! 🚀