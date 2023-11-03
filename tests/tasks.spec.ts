import { test, expect } from '@playwright/test';
// import { faker } from '@faker-js/faker';

test('deve poder cadastrar uma nova tarefa via id -> Estratégia 01', async ({ page, request }) => {

    // Dado que tenho uma nova tarefa
    const taskName = 'Ler um livro de TypeScript';
    await request.delete('http://localhost:3333/helper/tasks/' + taskName);
    
    // E estou na página de cadastro
    await page.goto('http://localhost:3000');

    // Quando faço o cadastro da tarefa
    await page.fill('#newTask', taskName);
    await page.click('css=button >> text=Create');

    //Então essa tarefa deve ser exibida na lista
    // const target = page.getByTestId('task-item');
    // const target = page.locator('.task-item');
    // await expect(target).toHaveText(taskName);
    const target = page.locator('css=.task-item p >> text=' + taskName);
    await expect(target).toBeVisible();
});

test('não deve permitir tarefa duplicada', async ({ page, request }) => {
    const task = {
        name: 'Ler um bom livro',
        is_done: false
    }

    await request.delete('http://localhost:3333/helper/tasks/' + task.name);
    await request.post('http://localhost:3333/tasks/', {data: task});
    await page.goto('http://localhost:3000');

    const inputTaskLocator = page.locator('input[class*=InputNewTask]');
    await inputTaskLocator.fill(task.name);

    const target = page.locator('.swal2-html-container');
    await expect(target).toHaveText('Task already exists!');

});

// test('deve poder cadastrar uma nova tarefa via placeholder -> Estratégia 02', async ({ page }) => {
//     await page.goto('http://localhost:3000');
//     await page.fill('input[placeholder="Add a new Task"]', faker.lorem.words());
// });

// test('deve poder cadastrar uma nova tarefa via type -> Estratégia 03', async ({ page }) => {
//     await page.goto('http://localhost:3000');
//     await page.fill('input[type=text]', faker.lorem.words());
// });

// test('deve poder cadastrar uma nova tarefa via classe -> Estratégia 04', async ({ page }) => {
//     await page.goto('http://localhost:3000');
//     //regular expression to find through dinamic classes
//     await page.fill('input[class*=InputNewTask]', faker.lorem.words());
// });

// test('deve poder cadastrar uma nova tarefa usando locator -> Estratégia 05', async ({ page }) => {
//     await page.goto('http://localhost:3000');
    
//     const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     await inputTaskLocator.fill(faker.lorem.words());
// });

// test('deve submeter o formulário teclando enter', async ({ page }) => {
//     await page.goto('http://localhost:3000');
    
//     const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     await inputTaskLocator.fill(faker.lorem.words());
//     await inputTaskLocator.press('Enter');
// });

// test('deve submeter o formulário clicando no botão Create -> Estratégia 01', async ({ page }) => {
//     await page.goto('http://localhost:3000');
    
//     const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     await inputTaskLocator.fill(faker.lorem.words());
//     await page.click('xpath=//button[contains(text(), "Create")]');
// });

// test('deve submeter o formulário clicando no botão Create -> Estratégia 02', async ({ page }) => {
//     await page.goto('http://localhost:3000');
    
//     const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     await inputTaskLocator.fill(faker.lorem.words());
//     await page.click('css=button >> text=Create');
// });