import React from 'react'
import Item from '../../src/components/Item/Item'
import { RecipeProps } from '@/interface/interface'
import { render, screen } from '@testing-library/react'

describe('Item', () => {
    it('should render titles, ingredients, instructions', () => {
        const item: RecipeProps = {
            recipe:{
                _id: '66jgkdkdjdjkd',
                title: 'Test Recipe',
                ingredients: 'egg, oil, butter',
                instructions: 'Test instructions',
                imageUrl: 'test.jpg'
            }

        }
        render(<Item recipe={item.recipe} />)

        expect(screen.getByText(item.recipe.title)).toBeInTheDocument()
    })
})