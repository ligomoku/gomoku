<img src="https://avatars.githubusercontent.com/u/123968089?s=400&u=26b1b8e1c6a7852376a21fd0af32d71c6fd13fda&v=4" width="200">

# Gomoku

## Setup Instructions

Using Makefile (from the root directory)

1. Run `make client` in one terminal tab. (node version 20.x)
2. In a separate terminal tab, run `make server`

## To get all submodules of GomokuAI

```bash
git submodule update --init --recursive
```

## Rapfi Helper (after docker-compose up -d)

```bash
docker-compose exec rapfi ./build/pbrain-rapfi --help
```

## Open API spec

URL: https://gomoku-gi8o.onrender.com/swagger

## Storybook

URL: https://storybook-static-self.vercel.app

## Project Management
This project is initiated and managed by:
- [Vitalijs Kuprins](https://github.com/vkuprin) (Email: vitas_s@inbox.lv)
- [Aleksandrs Vaguscneko](https://github.com/alequez97) (Email: aleksandrs.vaguscenko@gmail.com)

All strategic decisions are made by the project founders
<br/>
Contributions are welcome, provided they follow the [CONTRIBUTING.md](CONTRIBUTING.md) guidelines

## License
This project is licensed under the [AGPL-3.0](LICENSE) license
