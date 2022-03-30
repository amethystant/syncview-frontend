export default function (storage) {
    return (key, value) => storage.setItem(key, value)
}
