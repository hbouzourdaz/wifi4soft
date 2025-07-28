document.addEventListener('DOMContentLoaded', () => {
  const softwareListContainer = document.getElementById('software-list');
  const categoryListContainer = document.getElementById('category-list');
  const addSoftwareForm = document.getElementById('add-software-form');
  const addCategoryForm = document.getElementById('add-category-form');
  const categorySelect = addSoftwareForm.querySelector('select[name="category"]');
  const softwareSection = document.getElementById('software');
  const categoriesSection = document.getElementById('categories');
  const sidebarLinks = document.querySelectorAll('.admin-sidebar a');

  // Toggle between software and categories sections
  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (link.getAttribute('href') === '#software') {
        softwareSection.style.display = 'block';
        categoriesSection.style.display = 'none';
      } else {
        softwareSection.style.display = 'none';
        categoriesSection.style.display = 'block';
      }
    });
  });

  // Fetch and render software list
  async function fetchSoftware() {
    try {
      const res = await fetch('/api/software');
      const software = await res.json();
      softwareListContainer.innerHTML = '';
      software.forEach(item => {
        const div = document.createElement('div');
        div.textContent = item.title + ' (' + item.size + ')';
        softwareListContainer.appendChild(div);
      });
    } catch (error) {
      console.error('Error fetching software:', error);
    }
  }

  // Fetch and render categories list and populate select options
  async function fetchCategories() {
    try {
      const res = await fetch('/api/categories');
      const categories = await res.json();
      categoryListContainer.innerHTML = '';
      categorySelect.innerHTML = '';
      categories.forEach(cat => {
        const div = document.createElement('div');
        div.textContent = cat.name;
        categoryListContainer.appendChild(div);

        const option = document.createElement('option');
        option.value = cat._id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  // Handle add software form submission
  addSoftwareForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addSoftwareForm);
    const data = {
      title: formData.get('title'),
      iconUrl: formData.get('iconUrl'),
      size: formData.get('size'),
      category: formData.get('category')
    };
    try {
      const res = await fetch('/api/software', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        addSoftwareForm.reset();
        fetchSoftware();
      } else {
        alert('Failed to add software');
      }
    } catch (error) {
      console.error('Error adding software:', error);
    }
  });

  // Handle add category form submission
  addCategoryForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCategoryForm);
    const data = { name: formData.get('name') };
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        addCategoryForm.reset();
        fetchCategories();
      } else {
        alert('Failed to add category');
      }
    } catch (error) {
      console.error('Error adding category:', error);
    }
  });

  // Initial fetch
  fetchCategories();
  fetchSoftware();
});
