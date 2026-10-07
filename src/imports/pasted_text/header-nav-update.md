Actualizar exclusivamente el comportamiento del header y la navegación del sitio de Fijación de Precios.

No rediseñar el hero, no modificar la fotografía de Ariel Baños, no cambiar tipografías, colores, botones del contenido, estructura general ni el resto de las secciones.

OBJETIVO

Simplificar el header para que el inicio del sitio se vea limpio y el menú no compita con la fotografía ni con los CTA del hero.

El menú debe permanecer siempre colapsado. No mostrar navegación horizontal completa en ningún estado.

ESTADO INICIAL DEL HEADER

Cuando el usuario está en la parte superior de la página:

- Mostrar solamente el logo de Fijación de Precios a la izquierda.
- Mostrar solamente el botón “Menú” con ícono hamburguesa a la derecha.
- Mantener el diseño actual del botón Menú, ya que está aprobado.
- Eliminar del header inicial:
  - “Comprar el libro”.
  - “Consultar por un workshop”.
- No mostrar ningún enlace horizontal.
- Mantener el header limpio, liviano y bien integrado al hero.
- Evitar cualquier superposición con la fotografía de Ariel.
- El hero ya incluye sus propios botones de conversión, por lo que no deben repetirse en el header inicial.

MENÚ DESPLEGABLE

Al hacer clic en “Menú”, abrir un panel lateral o desplegable con los siguientes enlaces:

- Inicio
- Sobre mí
- Workshops
- Libros
- Contacto
- Recursos gratis

Incluir un botón de cierre visible.

Mantener el estilo visual actual del sitio:

- Fondo blanco.
- Tipografía oscura.
- Acentos en azul y rojo institucional.
- Espaciado amplio.
- Estados hover y focus accesibles.

HEADER STICKY AL HACER SCROLL

Cuando el usuario haga scroll entre 80 y 120 píxeles:

- Convertir el header en sticky.
- Mostrar fondo blanco sólido.
- Agregar un borde inferior o sombra muy sutil.
- Mantener el logo a la izquierda.
- Mantener el menú colapsado a la derecha.
- Agregar únicamente dos opciones comerciales antes del botón Menú:

1. Comprar el libro

- Mostrar en azul institucional.
- Puede funcionar como botón secundario con borde azul o como enlace destacado.
- Debe tener menor jerarquía que el botón rojo.
- Texto exacto: “Comprar el libro”.

2. Consultar por un workshop

- Mantener el botón rojo tal como está diseñado actualmente.
- Conservar tamaño, color, tipografía y estilo.
- Texto exacto: “Consultar por un workshop”.

Orden en desktop:

- Logo.
- Espacio flexible.
- Comprar el libro.
- Consultar por un workshop.
- Menú.

No desplegar el menú completo de navegación al hacer scroll. El resto de las secciones debe seguir dentro del menú hamburguesa.

TRANSICIÓN

- Aplicar una transición suave entre el header inicial y el sticky.
- Duración aproximada: 200 a 300 milisegundos.
- Evitar saltos de layout.
- Evitar que el contenido cambie de posición al aparecer el header sticky.
- Respetar prefers-reduced-motion.

COMPORTAMIENTO DE LOS ENLACES

Inicio:

- El enlace “Inicio” debe llevar siempre al Home principal.
- Usar la ruta raíz:
  /
- Desde páginas internas no debe llevar al inicio de la página actual.
- No usar #inicio en páginas internas.

Comprar el libro:

- Desde el Home, dirigir a la sección del libro o a la página Libros.
- Desde la página interna de Workshops, dirigir a la página Libros o a la sección del libro dentro del Home.
- No utilizar un ancla inexistente.

Consultar por un workshop:

- Desde el Home, dirigir a la página de Workshops o al formulario comercial correspondiente.
- Desde la página interna de Workshops, dirigir al formulario de consulta dentro de esa misma página.

Workshops:

- Desde el Home, abrir la página interna de Workshops.
- En la página de Workshops, mantener el enlace activo o dirigir al comienzo de esa página.

APLICAR TAMBIÉN EN LA PÁGINA INTERNA DE WORKSHOPS

Replicar exactamente el mismo sistema de header en la página de Workshops.

Estado inicial:

- Logo a la izquierda.
- Botón Menú a la derecha.
- Sin Comprar el libro.
- Sin Consultar por un workshop.
- Sin navegación horizontal.

Estado sticky al hacer scroll:

- Logo.
- Comprar el libro en azul.
- Consultar por un workshop en rojo.
- Menú colapsado.

Mantener en Home y Workshops:

- Misma altura de header.
- Mismos espaciados.
- Mismos tamaños de botones.
- Misma transición.
- Mismos estados hover y focus.
- Mismo comportamiento sticky.

RESPONSIVE

Desktop:

- Estado inicial: logo + Menú.
- Estado sticky: logo + Comprar el libro + Consultar por un workshop + Menú.

Tablet:

- Mantener siempre el menú colapsado.
- En el estado sticky, mostrar los dos CTA solamente si entran correctamente.
- Si no hay espacio suficiente, mantener visible el CTA rojo y mover “Comprar el libro” dentro del menú desplegable.

Mobile:

- Mostrar logo, CTA rojo compacto y Menú en el estado sticky.
- En el estado inicial, mostrar solamente logo y Menú.
- Incluir “Comprar el libro” dentro del menú desplegable.
- No comprimir botones ni generar textos en dos líneas.
- Mantener áreas táctiles de al menos 44 píxeles.

RESTRICCIONES

- No mostrar navegación horizontal completa.
- No mostrar los dos CTA en el header inicial.
- No modificar los botones del hero.
- No modificar la fotografía de Ariel.
- No cambiar el logo.
- No alterar la identidad visual.
- No rediseñar las demás secciones.
- No agregar nuevos accesos.
- No crear comportamientos diferentes entre Home y Workshops.
- No utilizar texto blanco sobre fondos claros.

RESULTADO ESPERADO

Al ingresar al sitio, el header debe mostrar únicamente el logo y el menú colapsado, logrando una vista limpia y sin interferencias sobre el hero.

Al hacer scroll, el header sticky debe incorporar solamente las dos acciones comerciales prioritarias:

- Comprar el libro, en azul.
- Consultar por un workshop, en rojo.

Toda la navegación restante debe permanecer dentro del menú hamburguesa.