export interface ResultDto<T> {
    data: T;
    isSuccess: boolean;
    message: string;
    statusCode: number;
}
