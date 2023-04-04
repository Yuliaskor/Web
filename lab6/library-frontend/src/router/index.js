import { createRouter, createWebHistory } from 'vue-router';
import BooksList from '@/components/books/BooksListComponent';
import AddBook from '@/components/books/AddBookComponent';
import EditBook from '@/components/books/EditBookComponent';
import AuthorsList from '@/components/authors/AuthorsListComponent';
import AddAuthor from '@/components/authors/AddAuthorComponent';
import EditAuthor from '@/components/authors/EditAuthorComponent';

const routes = [
  {
    path: '/',
    redirect: { name: 'Books' }
  },
  {
    path: '/books',
    name: 'Books',
    component: BooksList
  },
  {
    path: '/books/new',
    name: 'NewBook',
    component: AddBook
  },
  {
    path: '/books/:id',
    name: 'EditBook',
    component: EditBook,
    props: true
  },
  {
    path: '/authors',
    name: 'Authors',
    component: AuthorsList
  },
  {
    path: '/authors/new',
    name: 'NewAuthor',
    component: AddAuthor
  },
  {
    path: '/authors/:id',
    name: 'EditAuthor',
    component: EditAuthor,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router