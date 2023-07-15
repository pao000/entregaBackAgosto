const recibir = async () => {
    const url = "http://localhost:3000/computacion";
    const respuesta = await fetch(url);
    const mostrar = await respuesta.json();

    for (let itera of mostrar) {
        document.querySelector("#lista").innerHTML += `<tr>
                    <td class="uk-background-default">${itera.codigo}</td>
                    <td class="uk-background-default">${itera.nombre}</td>
                    <td class="uk-background-default">${itera.precio}</td>
                    <td class="uk-background-default">${itera.categoria}</td>
                    <td class="uk-background-default"><a class="uk-button uk-button-danger"
                            href="#modal-sections__eliminar_${itera.codigo}" uk-toggle>Eliminar</button></a>
                    <td class="uk-background-default"><a class="uk-button uk-button-secondary" href="#modal-sections_editar_${itera.codigo}" uk-toggle >Editar</a>
                    </td>
                </tr>
            <div id="modal-sections__eliminar_${itera.codigo}" uk-modal>
            <div class="uk-modal-dialog">
            <button class="uk-modal-close-default" type="button" uk-close></button>
            <div class="uk-modal-header">
                <h2 class="uk-modal-title">Eliminar producto</h2>
            </div>
            <div class="uk-modal-body">
                <h3>¿Desea eliminar ${itera.nombre}?</h3>
            </div>
            <div class="uk-modal-footer uk-text-right">
                <button class="uk-button uk-button-default uk-modal-close" type="button">NO</button>
                <button class="uk-button uk-button-primary" type="button">SI</button>
            </div>
        </div>
        
        <div id="modal-sections_editar_${itera.codigo}" uk-modal>
<div class="uk-modal-dialog">
    <button class="uk-modal-close-default" type="button" uk-close></button>
    <div class="uk-modal-header">
        <h2 class="uk-modal-title">Editar ${itera.nombre}</h2>
    </div>
    <div class="uk-modal-body">
        <form class="uk-container uk-margin">
            <div class="uk-margin">
                <label>Nombre</label>
                <input class="uk-input" value="${itera.nombre}" type="text" placeholder="Input" aria-label="Input">
            </div>
            <div class="uk-margin">
                <label>Precio</label>
                <input class="uk-input" value="${itera.precio}" type="text" placeholder="Input" aria-label="Input">
            </div>

            <div class="uk-margin">
                <label>Categoría</label>
                <select class="uk-select" aria-label="Select">
                    <option>${itera.categoria}</option>
                </select>
            </div>
        </form>
    </div>
    <div class="uk-modal-footer uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Cancelar</button>
        <button class="uk-button uk-button-primary" type="button">Guardar</button>
    </div>
</div>
</div>`


    }
}
recibir();