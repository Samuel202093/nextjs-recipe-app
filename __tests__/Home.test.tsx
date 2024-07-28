import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NavBar from '@/components/NavBar/NavBar'



it('should have Create text', ()=>{
    render(<NavBar/>) 

    const myElem = screen.getByText('Create')

    expect(myElem).toBeInTheDocument()
})
