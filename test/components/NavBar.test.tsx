// import { it, expect, describe } from 'vitest'
import React from 'react'
import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom';
import NavBar from '../../src/components/NavBar/NavBar'
import { RouterContextProvider } from './customRouterContext';
import { createMockRouter } from './mockRouter';


describe('NavBar', ()=>{
    it('should render the navbar and its link when provided', () => {
        render(
            <RouterContextProvider router={createMockRouter({})}>
            <NavBar />
          </RouterContextProvider>
    )

    const links = [
        { name: /Home/i, href: '/' },
        { name: /Create/i, href: '/create' },
      ];
  
      links.forEach(({ name, href }) => {
        const linkElement = screen.getByRole('link', { name });
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', href);
      });

    })
})