import { test as setup } from '../../fixtures';
import { user } from '../../data/user';
import { AUTH_STATE_PATH } from '../../constants'

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