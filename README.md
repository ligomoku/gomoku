<div align="left">
  <img src="https://avatars.githubusercontent.com/u/123968089?s=400&u=26b1b8e1c6a7852376a21fd0af32d71c6fd13fda&v=4" width="200" alt="Gomoku Logo">
</div>

# [gomoku.app](https://gomoku.app)

[![Node.js v20](https://img.shields.io/badge/Node.js-v20-green.svg)](https://nodejs.org)
[![.NET v8](https://img.shields.io/badge/.NET-v8.0-blue)](https://dotnet.microsoft.com/en-us/download/dotnet/8.0)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://hub.docker.com/r/vkuprins97/gomoku-server/)

A sophisticated implementation of the classic Gomoku (Five in a Row)

## 🚀 Quick Start

### Setup Instructions

Using Makefile (from the root directory):

1. Run the client:
   ```bash
   make client    # Requires Node.js v20.x
   ```

2. In a separate terminal tab, run the server:
   ```bash
   make server
   ```

## 🛠️ Development Tools

### Rapfi Helper

After running `docker-compose up -d`, you can access the Rapfi helper:

```bash
docker-compose exec rapfi ./build/pbrain-rapfi --help
```

## 📚 Documentation

### API Documentation
- OpenAPI Specification: [https://api.gomoku.app/swagger](https://api.gomoku.app/swagger)

### Component Library
- Storybook: [https://story.gomoku.app](https://story.gomoku.app)

## 👥 Project Management

### Project Founders

This project is initiated and managed by:

- **Vitalijs Kuprins**
  - GitHub: [@vkuprin](https://github.com/vkuprin)
  - Email: vitas_s@inbox.lv

- **Aleksandrs Vaguscneko**
  - GitHub: [@alequez97](https://github.com/alequez97)
  - Email: aleksandrs.vaguscenko@gmail.com

All strategic decisions are made by the project founders

### Contributing

We welcome contributions! Please review our [Contributing Guidelines](CONTRIBUTING.md) before submitting any changes

## 📄 License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE).
