export const getAuthHeaders = async () => {
    try {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        const accessToken = cookieStore.get('accessToken')?.value;

        return accessToken ? { Cookie: `accessToken=${accessToken}` } : {};
    } catch (err) {
        return {}
    }
}