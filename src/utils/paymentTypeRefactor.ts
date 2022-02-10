export default (status:string) => {
    if (status === 'income') return 1
    if (status === 'expense') return 2
}