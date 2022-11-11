Simple ToDo application

```
docker run -it --rm -v ${PWD}:/app -w /app node:19 bash
npm install --global typescript@4.8
tsc
node dist/index.js
```
