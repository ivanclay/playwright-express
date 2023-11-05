import { expect, test } from '@playwright/test';
import { TaskModel } from './fixtures/task.model';
import { deleteTaskByHelper, postTask } from './support/helpers';
import { TasksPage } from './support/pages/tasks/index';
import data from './fixtures/tasks.json';

let tasksPage: TasksPage;

test.beforeEach('instanciar objetos padrão', ({ page }) => {
    tasksPage = new TasksPage(page);
});

test.describe('cadastro', () => {

    test('deve poder cadastrar uma nova tarefa via id -> Estratégia 01', async ({ page, request }) => {
    
        // const task: TaskModel = {
        //     name: 'Ler um livro de TypeScript',
        //     is_done: false
        // }
    
        const task = data.success as TaskModel;
    
        deleteTaskByHelper(request, task.name );
        
        // const tasksPage: TasksPage = new TasksPage(page);
        await tasksPage.go();
        await tasksPage.create(task);
        await tasksPage.shouldHaveText(task.name);
    });
    
    test('não deve permitir tarefa duplicada', async ({ request }) => {
        
        const task = data.duplicate as TaskModel;
    
        await deleteTaskByHelper(request, task.name );
        await postTask(request, task);
    
        // const tasksPage: TasksPage = new TasksPage(page);
        await tasksPage.go();
        await tasksPage.create(task);
        await tasksPage.alertHaveText('Task already exists!');
    });
    
    test('campo obrigatório', async () => {
        const task = data.required as TaskModel;
    
        // const tasksPage: TasksPage = new TasksPage(page);
        await tasksPage.go();
        await tasksPage.create(task);
    
        const validationMassage = await tasksPage.inputTaskLocator.evaluate(e => (e as HTMLInputElement).validationMessage);
        expect(validationMassage).toEqual('This is a required field');
    });
});

test.describe('atualização', () => {
    test('deve concluir uma tarefa', async ({ request }) => {
        const task = data.update as TaskModel;
        await deleteTaskByHelper(request, task.name );
        await postTask(request, task);
    
        // const tasksPage: TasksPage = new TasksPage(page);
        await tasksPage.go();
        await tasksPage.toggle(task.name);
        await tasksPage.shouldBeDone(task.name);
    });
});

test.describe('exclusão', () => {
    test('deve excluir uma tarefa', async ({ request }) => {
        const task = data.delete as TaskModel;
        await deleteTaskByHelper(request, task.name );
        await postTask(request, task);
    
        // const tasksPage: TasksPage = new TasksPage(page);
        await tasksPage.go();
        await tasksPage.remove(task.name);
        await tasksPage.shouldNotExist(task.name);
    });
});


// import { faker } from '@faker-js/faker';

// async function deleteTaskByHelper(request: APIRequestContext, taskName: string){
//     await request.delete('http://localhost:3333/helper/tasks/' + taskName);
// }

// async function postTask(request: APIRequestContext, task: TaskModel){
//     const newTask = await request.post('http://localhost:3333/tasks/', {data: task});
//     await expect(newTask.ok).toBeTruthy();
// }

// test('deve poder cadastrar uma nova tarefa via id -> Estratégia 01', async ({ page, request }) => {

//     const task: TaskModel = {
//         name: 'Ler um livro de TypeScript',
//         is_done: false
//     }

//     // Dado que tenho uma nova tarefa
//     deleteTaskByHelper(request, task.name );
    
//     const tasksPage: TasksPage = new TasksPage(page);
//     await tasksPage.go();
//     await tasksPage.create(task);
//     await tasksPage.shouldHaveText(task.name);

//     // await page.goto('http://localhost:3000');
//     // const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     // await inputTaskLocator.fill(task.name);
//     // await page.click('css=button >> text=Create');
// });

// test('não deve permitir tarefa duplicada', async ({ page, request }) => {
//     const task: TaskModel = {
//         name: 'Comprar um livro de TypeScript',
//         is_done: false
//     }

//     await deleteTaskByHelper(request, task.name );
//     await postTask(request, task);

//     const tasksPage: TasksPage = new TasksPage(page);
//     await tasksPage.go();
//     await tasksPage.create(task);
//     await tasksPage.alertHaveText('Task already exists!');

//     // await page.goto('http://localhost:3000');
//     // const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     // await inputTaskLocator.fill(task.name);
//     // await page.click('css=button >> text=Create');

// });

// test('não deve permitir tarefa duplicada', async ({ page, request }) => {
//     const task: TaskModel = {
//         name: 'Comprar um livro de TypeScript',
//         is_done: false
//     }

//     //await request.delete('http://localhost:3333/helper/tasks/' + task.name);
//     // await request.post('http://localhost:3333/tasks/', {data: task});
//     deleteTaskByHelper(request, task.name );
//     postTask(request, task);
//     await page.goto('http://localhost:3000');

//     const inputTaskLocator = page.locator('input[class*=InputNewTask]');
//     await inputTaskLocator.fill(task.name);
//     await page.click('css=button >> text=Create');

//     const target = page.locator('.swal2-html-container');
//     await expect(target).toHaveText('Task already exists!');

// });
// test('deve poder cadastrar uma nova tarefa via id -> Estratégia 01', async ({ page, request }) => {

//     const task: TaskModel = {
//         name: 'Ler um livro de TypeScript',
//         is_done: false
//     }

//     // Dado que tenho uma nova tarefa
//     //await request.delete('http://localhost:3333/helper/tasks/' + task.name);
//     deleteTaskByHelper(request, task.name );
    
//     // E estou na página de cadastro
//     await page.goto('http://localhost:3000');

//     // Quando faço o cadastro da tarefa
//     await page.fill('#newTask', task.name);
//     await page.click('css=button >> text=Create');

//     //Então essa tarefa deve ser exibida na lista
//     // const target = page.getByTestId('task-item');
//     // const target = page.locator('.task-item');
//     // await expect(target).toHaveText(task.name);
//     const target = page.locator('css=.task-item p >> text=' + task.name);
//     await expect(target).toBeVisible();
// });

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