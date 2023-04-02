import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/components/HomeComponent';
import BooksList from '@/components/books/BooksListComponent';
import AddBook from '@/components/books/AddBookComponent';
import EditBook from '@/components/books/EditBookComponent';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router