import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from "."


describe("Footer.js", () => {
    test('renders all rights reserved', async () => {
        render(<Footer />);
        const divText = await screen.findByText(/all rights reserved/i);
        expect(divText).toBeInTheDocument();
    });
});