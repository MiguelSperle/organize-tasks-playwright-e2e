import { test as setup } from '../../fixtures';
import { user } from '../../data/user';
import { AUTH_STATE_PATH } from '../../constants'

/**
 * Configuração do estado de autenticação para os testes E2E.
 * 
 * Preferencialmente, a autenticação deve ser realizada via API durante o setup.
 * 
 * Caso a API de autenticação não esteja disponível, o estado autenticado pode
 * ser simulado por meio da injeção direta com cookies ou com localStorage no contexto do navegador.
**/

setup('configure authentication state', async ({ page, baseURL }) => {
    if (!baseURL) throw new Error('The baseURL is not configured');

    await page.context().addCookies([
        {
            name: 'session-identifier',
            value: user.credentials.identifiers.email,
            url: baseURL,
            httpOnly: false,
            secure: new URL(baseURL).protocol === 'https:',
            sameSite: 'Lax',
        }
    ]);

    await page.context().storageState({ path: AUTH_STATE_PATH });
});