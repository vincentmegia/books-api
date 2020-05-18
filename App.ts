import { Application, Router } from 'https://deno.land/x/oak/mod.ts';
import { BookShelf } from './BookShelf.ts';
      
const env = Deno.env.toObject();
const PORT = env.PORT || '5050';
//const HOST = env.HOST || '127.0.0.1';
const router = new Router();
const bookShelf = new BookShelf();

router
    .get('/books', bookShelf.getBooks)
    .get('/books/:title', bookShelf.getBook)
    .post('/books', bookShelf.addBook)
    .put('/books/:title', bookShelf.updateBook)
    .delete('/books/:title', bookShelf.removeBook);


window.onload = (e: Event): void => {
    console.log("performing initialize");
};

window.onunload = (e: Event): void => {
    console.log("performing cleanup for graceful exit");
};

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

//console.log(`Server: ${HOST}`)
console.log(`Listening on port ${PORT}...`);

//await app.listen(`${HOST}:${PORT}`);
await app.listen({port: Number(PORT)});