import Visibility from "./visibility"

export function append_child_to_container(container: HTMLElement, element: HTMLElement) {
    container.appendChild(element)
}

export function clear_container_children(container: HTMLElement) {
    while(container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

export function get_element_by_id(container_id: string): HTMLElement {
    const container = document.getElementById(container_id)

    if(!container) {
        throw new Error(`${container_id} Element was not found in DOM`)
    }

    return container
}

export function hide_element(element: HTMLElement) {
    element.style.visibility = Visibility.hidden
}

export function show_element(element: HTMLElement) {
    element.style.visibility = Visibility.visible
}

export function add_click_event_to_element(element: HTMLElement, func: Function) {
    element.addEventListener('click', () => {
        func()
    })
}