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
        await this.page.goto('/');
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
    
    async toggle(taskName: string){
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`);
        await target.click();
    }

    async shouldBeDone(taskName: string){
        const target = this.page.getByText(taskName);
        await expect(target).toHaveCSS('text-decoration-line', 'line-through');
    }

    async remove(taskName: string){
        const target = this.page.locator(`xpath=//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`);
        await target.click();
    }

    async shouldNotExist(taskName: string){
        const target = this.page.getByText(taskName);
        await expect(target).not.toBeVisible();
    }
}