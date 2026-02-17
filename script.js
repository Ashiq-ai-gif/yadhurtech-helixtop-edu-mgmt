document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    const kanbanColumns = document.querySelectorAll('.kanban-column');

    // Sidebar Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const targetId = item.dataset.target;
            contentSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Kanban Drag and Drop (Visual Only)
    let draggedCard = null;

    document.querySelectorAll('.kanban-card').forEach(card => {
        card.setAttribute('draggable', true);

        card.addEventListener('dragstart', (e) => {
            draggedCard = card;
            setTimeout(() => {
                card.classList.add('dragging');
            }, 0);
        });

        card.addEventListener('dragend', () => {
            draggedCard.classList.remove('dragging');
            draggedCard = null;
        });
    });

    kanbanColumns.forEach(column => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow drop
            const afterElement = getDragAfterElement(column, e.clientY);
            const draggable = document.querySelector('.dragging');
            if (draggable) {
                if (afterElement == null) {
                    column.appendChild(draggable);
                } else {
                    column.insertBefore(draggable, afterElement);
                }
            }
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedCard) {
                // Update visual status (not actual data in this prototype)
                draggedCard.dataset.status = column.id;
            }
        });
    });

    function getDragAfterElement(column, y) {
        const draggableCards = [...column.querySelectorAll('.kanban-card:not(.dragging)')];

        return draggableCards.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: -Infinity }).element;
    }

    // Simulate student enrollment link generation (for UI demonstration)
    const generateLinkBtn = document.querySelector('.generate-link-btn');
    const enrollmentLinkInput = document.getElementById('enrollment-link');
    const instituteNameInput = document.getElementById('institute-name');

    if(generateLinkBtn && enrollmentLinkInput && instituteNameInput) {
        generateLinkBtn.addEventListener('click', () => {
            const instituteName = instituteNameInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
            enrollmentLinkInput.value = `https://helixtop.com/enroll/${instituteName || 'yourinstituteid'}`;
            alert("Enrollment link generated! (Prototype)");
        });
    }

    // Simulate attendance photo upload
    const studentPhotoUpload = document.getElementById('student-photo-upload');
    const staffPhotoUpload = document.getElementById('staff-photo-upload');

    if (studentPhotoUpload) {
        studentPhotoUpload.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                alert("Student attendance marked with photo! (Prototype)");
                // In a real app, this would upload the image and mark attendance
            }
        });
    }
    if (staffPhotoUpload) {
        staffPhotoUpload.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                alert("Staff attendance marked with photo! (Prototype)");
                // In a real app, this would upload the image and mark attendance
            }
        });
    }

});
