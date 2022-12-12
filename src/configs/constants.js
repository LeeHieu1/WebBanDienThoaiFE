export const APP_BASE_URL = "http://localhost:8082";

export const numberFormat = (value) =>
    new Intl.NumberFormat('vi-VN',
        {
            style: 'currency',
            currency: 'VND'
        }).format(value);
