import { Locator, Page, expect } from "@playwright/test";
import { TaskModel } from "../../../fixtures/task.model";

export class TasksPage{
    
    readonly page: Page;
    readonly inputTaskLocator: Locator

    constructor(page: Page){
        this.page = page;
        //pra mim isso aqui não fez muito sentido
        this.inputTaskLocator = page.locator('input[class*=InputNewTask]');
    }

    async go(){
        await this.page.goto('http://localhost:3000');
    }

    async create(task: TaskModel){
        // const inputTaskLocator = this.page.locator('input[class*=InputNewTask]');
        await this.inputTaskLocator.fill(task.name);
        await this.page.click('css=button >> text=Create');
    }
    
    async shouldHaveText(taskName: string){
        const target = this.page.locator('css=.task-item p >> text=' + taskName);
        await expect(target).toBeVisible();
    }

    async alertHaveText(text: string){
        const target = this.page.locator('.swal2-html-container');
        await expect(target).toHaveText(text);
    }

    
}