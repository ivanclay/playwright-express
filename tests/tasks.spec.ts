import { test, expect } from '@playwright/test';

test('deve poder cadastrar uma nova tarefa via id -> Estratégia 01', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#newTask', 'Ler um livro de TypeScript');
});

test('deve poder cadastrar uma nova tarefa via placeholder -> Estratégia 02', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[placeholder="Add a new Task"]', 'Ler um livro de TypeScript');
});

test('deve poder cadastrar uma nova tarefa via type -> Estratégia 03', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('input[type=text]', 'Ler um livro de TypeScript');
});

test('deve poder cadastrar uma nova tarefa via classe -> Estratégia 04', async ({ page }) => {
    await page.goto('http://localhost:3000');
    //regular expression to find through dinamic classes
    await page.fill('input[class*=InputNewTask]', 'Ler um livro de TypeScript');
});

test('deve poder cadastrar uma nova tarefa usando locator -> Estratégia 05', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const inputTaskLocator = page.locator('input[class*=InputNewTask]');
    await inputTaskLocator.fill('Ler um livro de TypeScript');
});

test('deve submeter o formulário teclando enter', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const inputTaskLocator = page.locator('input[class*=InputNewTask]');
    await inputTaskLocator.fill('Ler um livro de TypeScript');
    await inputTaskLocator.press('Enter');
});

test('deve submeter o formulário clicando no botão Create -> Estratégia 01', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const inputTaskLocator = page.locator('input[class*=InputNewTask]');
    await inputTaskLocator.fill('Ler um livro de TypeScript');
    await page.click('xpath=//button[contains(text(), "Create")]');
});

test('deve submeter o formulário clicando no botão Create -> Estratégia 02', async ({ page }) => {
    await page.goto('http://localhost:3000');
    
    const inputTaskLocator = page.locator('input[class*=InputNewTask]');
    await inputTaskLocator.fill('Ler um livro de TypeScript');
    await page.click('css=button >> text=Create');
});