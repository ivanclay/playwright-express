import { test, expect } from '@playwright/test';

test('deve poder cadastrar uma nova tarefa', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#newTask', 'Ler um livro de TypeScript');

    await page.fill('input[placeholder="Add a new Task"]', 'Ler um livro de TypeScript');
    await page.fill('input[type=text]', 'Ler um livro de TypeScript');
    
    //regular expression to find through dinamic classes
    await page.fill('input[class*=InputNewTask]', 'Ler um livro de TypeScript');
});