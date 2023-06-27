# Разделение схем Prisma
## Проблема
На текущий момент, система **Prisma ORM** не поддерживает разделение схем по разным файлам или папкам. 
Весь набор схем должен находиться в одном файле *schema.prisma*. 

[Issue](https://github.com/prisma/prisma/issues/2377) на GitHub


## Решение
Схемы **Prisma** разделяются по следующей структуре:
```
./prisma/
├── schemas/
│   ├── user.prisma
│   ├── card.prisma
│   └── ...
└── schema.prisma
```

Затем при помощи команды в `package.json` мы объединяем 
все схемы в единый файл **schema.prisma**

**Команда:**
```json
{
  "prisma:schema:generate": "awk 1 ./prisma/schemas/*.prisma > src/prisma/schema.prisma && npx prisma format --schema src/prisma/schema.prisma"
}
```

Команду можно выполнить вручную и также она запускается при каждом коммите, используя хук `pre-commit`
