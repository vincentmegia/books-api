import { Book } from './Book.ts';

export class BookShelf {
    private books: Array<Book> = [
        {
            title: 'Denonutshell1',
            author: 'iamstupendous',
        },
        {
            title: 'node_modules black hole',
            author: 'iamstupendous',
        }
    ];

    test = ({test}: {test:string}) => {
        console.log(test);
    }
    /**
     * 
     */
    getBooks = ({response}: {response:any}) => {
        response.body = this.books;
        return response;
    }
    
    /**
     * 
     */
    getBook = ({
        params,
        response}: {
            params: {title : string}
            response: any
        }) => {
            const book = this.books.filter(book => book.title === params.title)
            if (book.length){
                response.status = 200;
                response.body = book[0];
                return;
            }
            response.status = 400;
            response.body = { msg: `Cannot find book ${params.title}`};
        }
    
    /**
     * 
     */
    addBook = async ({
        request,
        response,
        }: {
            request: any
            response: any
        }) => {            
            const body = await request.body();
            const book: Book = body.value;
            this.books.push(book);
            
            response.body = { msg: 'OK' };
            response.status = 200;
        }
    
    /**
     * 
     */
    updateBook = async ({
        params,
        request,
        response,
        }: {
            params: {
                title: string
            }
            request: any
            response: any
        }) => {
            const temp = this.books.filter((existingBook) => existingBook.title === params.title);
            const body = await request.body();
            const { author }: { author: string } = body.value;
            
            if (temp.length) {
                temp[0].author = author;
                response.status = 200;
                response.body = { msg: 'OK' };
                return;
            }
            
            response.status = 400;
            response.body = { msg: `Cannot find book ${params.title}` };
        }
    
    /**
     * 
     */
    removeBook = ({
        params,
        response,
        }: {
        params: {
            title: string
        }
        response: any
        }) => {
            const lengthBefore = this.books.length;
            this.books = this.books.filter((book) => book.title !== params.title);
            
            if (this.books.length === lengthBefore) {
                response.status = 400;
                response.body = { msg: `Cannot find book ${params.title}` };
                return;
            }
            
            response.body = { msg: 'OK' };
            response.status = 200;
        }
}