export const validateMessage = (name: string) => {
    return name + " is required!";
}

export const commonPlaceholderInput = (name: string) => {
    return "Type " + name
}

export const commonPlaceholderSelect = (name: string) => {
    return "Choose " + name
}

export const validateDataSource = (data?: any[]) => {
    if (!data || data.length <= 0) return [];

    return data
}

export function capitalizeFirstLetter(string?: string) {
    if (!string) return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const convertStatusToTag = (status?: string) => {
    switch (status) {
        default:
            break;
    }
}

export function generateArrayOfFixedLength(arr: any[], length = 4, defaultValue = undefined) {
    const result = new Array(length).fill(defaultValue);
    for (let i = 0; i < arr.length && i < length; i++) {
        result[i] = arr[i];
    }
    return result;
}

export function checkDuration(duration?: number) {
    if (Number(duration) > 1) {
        return "nights";
    } else {
        return "night";
    }
}