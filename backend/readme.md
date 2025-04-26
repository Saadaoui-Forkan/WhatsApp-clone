### Starting with typescript
```
npx tsc --init
npm i -D typescript ts-node @types/node
```

### Installing prisma
```
npm install prisma typescript tsx @types/node --save-dev
npx tsc --init
npx prisma
npx prisma init --datasource-provider mongodb --output ../generated/prisma
```

### Update package.json
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.ts",
    "dev": "nodemon --watch ./ --ext ts --exec tsx index.ts",
    "build": "tsc"
  },
```
