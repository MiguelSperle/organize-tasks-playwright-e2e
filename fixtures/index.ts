import { test as base } from '@playwright/test';
import { PageManager } from '../pages/manager/page-manager';

/**
 * Responsabilidades:
 * - Instanciar os Page Objects e disponibilizá-los automaticamente aos testes.
 * - Preparar o estado necessário para o teste sob demanda.
 * 
 * Estratégia para preparar o estado (em ordem de preferência):
 * 1. API: sempre que disponível, criar o recurso diretamente pela API.
 * 2. Storage (localStorage): quando não há API para o
 *    recurso, gravar o estado direto no storage do navegador.
**/

type TestFixtures = {
    pm: PageManager;
};

export const test = base.extend<TestFixtures>({
    pm: async ({ page }, use) => {
        await use(new PageManager(page));
    }
});

export { expect } from '@playwright/test';