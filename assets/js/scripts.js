// assets/js/kanban-dnd.js
document.addEventListener('DOMContentLoaded', () => {
  const kanbanBoard = document.querySelector('[data-kanban]');
  if (!kanbanBoard) return;

  let draggedCard = null;

  // Make cards draggable
  kanbanBoard.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', () => {
      draggedCard = card;
      setTimeout(() => card.classList.add('dragging'), 0);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      draggedCard = null;
    });
  });

  // Handle drop zones
  kanbanBoard.querySelectorAll('[data-droppable]').forEach(dropZone => {
    dropZone.addEventListener('dragover', e => {
      e.preventDefault();
      dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
      dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', e => {
      e.preventDefault();
      dropZone.classList.remove('drag-over');
      
      if (draggedCard && !dropZone.contains(draggedCard)) {
        dropZone.appendChild(draggedCard);

        // Update data attribute
        const newColumn = dropZone.closest('.kanban-column').dataset.column;
        draggedCard.dataset.column = newColumn;

        console.log('Card moved to:', newColumn);
      }
    });
  });
});