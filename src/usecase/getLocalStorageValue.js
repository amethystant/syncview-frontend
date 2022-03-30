export default function (storage) {
    return (key) => storage.getItem(key)
}
