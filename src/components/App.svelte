<script>
  /* Importamos los estilos de la aplicación */
  import "../app.css";
  import { Icon } from 'svelte-fontawesome';
  import { faClipboard } from '@fortawesome/free-solid-svg-icons/faClipboard';
  /* Importamos los tipos de datos */
  import { onMount } from 'svelte';
  import { createEventDispatcher } from 'svelte';

  let texto = '';
  let desviacion = 14;
  const alfabetoLetras = 'abcdefghijklmnñopqrstuvwxyz';

  const esMayuscula = (letra) =>{
    return letra.toUpperCase() === letra && letra.toLowerCase() !== letra;
  }

  const caesarCipher = (texto, desviacion) => {
    // Normalizamos la desviación para que siempre esté en el rango del alfabeto de letras
    const desviacionNormalizada = desviacion % alfabetoLetras.length;

    // Creamos un nuevo alfabeto de letras desplazado según la desviación
    const alfabetoLetrasDesplazado =
      alfabetoLetras.slice(desviacionNormalizada) + alfabetoLetras.slice(0, desviacionNormalizada);

    // Creamos un diccionario para mapear cada letra del alfabeto de letras al correspondiente desplazado
    const diccionarioLetras = new Map();
    for (let i = 0; i < alfabetoLetras.length; i++) {
      diccionarioLetras.set(alfabetoLetras[i], alfabetoLetrasDesplazado[i]);
    }

    // Codificamos el texto letra a letra, utilizando los diccionarios para reemplazar cada letra o número
    let textoCodificado = '';
    for (let i = 0; i < texto.length; i++) {
      const caracter = texto[i];
      let caracterCodificado;
      if (diccionarioLetras.has(caracter.toLowerCase())) {
        const letraOriginal = esMayuscula(caracter) ? caracter.toLowerCase() : caracter;
        const letraCodificada = diccionarioLetras.get(letraOriginal) || '';
        caracterCodificado = esMayuscula(caracter) ? letraCodificada.toUpperCase() : letraCodificada;
      } else if (+caracter >= 0 && +caracter <= 9) {
        caracterCodificado = +caracter + desviacion;
      } else {
        caracterCodificado = caracter;
      }
      textoCodificado += caracterCodificado;
    }

    return textoCodificado;
  }


  const rafaCipher = (texto, desviacion) => {
      return (texto != "")?"rgr"+caesarCipher(texto, desviacion)+desviacion+"*":"";
  }

  const copiarAlPortapapeles = (texto) => {
    navigator.clipboard.writeText(texto);
  }

  const dispatch = createEventDispatcher();
  onMount(() => {
      dispatch('appready');
  });
</script>

<div class="contenedor">
    <input
        type="text"
        placeholder="Texto a cifrar"
        bind:value="{texto}"
        class="border rounded p-2 mb-4"
    />
    <input
        type="number"
        placeholder="Desviación"
        bind:value="{desviacion}"
        class="border rounded p-2 mb-4"
    />
    <div id="contenedorResultado">
        <div class="resultCipher">          
          <button
            class="btnClipboard"
            on:click={() => copiarAlPortapapeles(caesarCipher(texto, desviacion))}
          >
            <Icon icon={faClipboard} size="xl" />
          </button>
          <p>{caesarCipher(texto, desviacion)}</p>
        </div>
        <div class="resultCipher">
            <button
              class="btnClipboard"
              on:click={() => copiarAlPortapapeles(rafaCipher(texto, desviacion))}
            >
              <Icon icon={faClipboard} size="xl" />
            </button>
            <p>{rafaCipher(texto, desviacion)}</p>
        </div>
    </div>
</div>
  