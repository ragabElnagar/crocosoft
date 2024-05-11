export const generateId=()=>{
    return (Math.random() * 100).toLocaleString().slice(0, 2)
}