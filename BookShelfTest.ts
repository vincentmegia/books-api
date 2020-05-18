import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { BookShelf } from "./BookShelf.ts";

Deno.test("BookShelfGetBookTest", () => {
    const bookShelf = new BookShelf();
    const response = bookShelf.getBooks({response: {body:{}}});
    assertEquals(response.body.length, 2)
});