document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const tabPanels = document.querySelectorAll('[role="tabpanel"]');
  const indicator = document.querySelector('.tabs-indicator');
  let currentTab = null;

  function moveIndicator(tab) {
    if (!indicator || !tab) return;
    const tabRect = tab.getBoundingClientRect();
    const parentRect = tab.parentElement.getBoundingClientRect();
    indicator.style.width = tab.offsetWidth + 'px';
    indicator.style.left = (tab.offsetLeft - tab.parentElement.offsetLeft) + 'px';
  }

  // Function to handle tab switching with animation
  function switchTab(newTab) {
    if (currentTab === newTab) return;

    const oldPanel = currentTab ? document.getElementById(currentTab.getAttribute('data-tab')) : null;
    const newPanel = document.getElementById(newTab.getAttribute('data-tab'));

    // Update tab states
    tabs.forEach(tab => {
      const isSelected = tab === newTab;
      tab.classList.toggle('active', isSelected);
      tab.setAttribute('aria-selected', isSelected);
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    // Handle panel transitions
    if (oldPanel) {
      oldPanel.style.opacity = '0';
      oldPanel.style.transform = 'translateY(10px)';
      setTimeout(() => {
        oldPanel.classList.remove('tab-content--active');
        oldPanel.hidden = true;
      }, 300);
    }

    // Show new panel with animation
    if (newPanel) {
      newPanel.hidden = false;
      newPanel.classList.add('tab-content--active');
      // Force reflow
      newPanel.offsetHeight;
      newPanel.style.opacity = '1';
      newPanel.style.transform = 'translateY(0)';
    }

    currentTab = newTab;
    moveIndicator(newTab);

    // Initialize tab-specific functionality
    const tabId = newTab.getAttribute('data-tab');
    switch(tabId) {
      case 'panel-password':
        initializePasswordTab();
        break;
      case 'panel-basic':
        initializeBasicTab();
        break;
      case 'panel-trips':
        initializeTripsTab();
        break;
      case 'panel-deactivate':
        initializeDeactivateTab();
        break;
    }
  }

  // Add click handlers to tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab));

    // Handle keyboard navigation
    tab.addEventListener('keydown', e => {
      let newTab;
      const currentIndex = Array.from(tabs).indexOf(tab);

      switch(e.key) {
        case 'ArrowLeft':
          newTab = tabs[currentIndex - 1] || tabs[tabs.length - 1];
          break;
        case 'ArrowRight':
          newTab = tabs[currentIndex + 1] || tabs[0];
          break;
        case 'Home':
          newTab = tabs[0];
          break;
        case 'End':
          newTab = tabs[tabs.length - 1];
          break;
        default:
          return;
      }

      e.preventDefault();
      newTab.focus();
      switchTab(newTab);
    });
  });

  // Initialize first tab
  const firstTab = document.querySelector('[role="tab"].active') || document.querySelector('[role="tab"][aria-selected="true"]') || tabs[0];
  if (firstTab) {
    switchTab(firstTab);
    moveIndicator(firstTab);
  }

  // Tab-specific initialization functions
  function initializePasswordTab() {
    const passwordInput = document.getElementById('newPassword');
    const confirmInput = document.getElementById('confirmPassword');
    const strengthMeter = document.querySelector('.strength-meter__bar');
    const strengthText = document.getElementById('strengthText');

    if (passwordInput && confirmInput) {
      passwordInput.addEventListener('input', updatePasswordStrength);
      confirmInput.addEventListener('input', checkPasswordMatch);
    }

    function updatePasswordStrength() {
      const password = passwordInput.value;
      let strength = 0;
      let feedback = '';

      if (password.length >= 8) strength += 1;
      if (password.match(/[a-z]/)) strength += 1;
      if (password.match(/[A-Z]/)) strength += 1;
      if (password.match(/[0-9]/)) strength += 1;
      if (password.match(/[^a-zA-Z0-9]/)) strength += 1;

      const strengthClasses = ['none', 'weak', 'medium', 'strong', 'very-strong'];
      const strengthLabels = ['None', 'Weak', 'Medium', 'Strong', 'Very Strong'];
      const strengthColors = ['#dc3545', '#ffc107', '#fd7e14', '#20c997', '#198754'];

      strengthMeter.style.width = `${(strength / 5) * 100}%`;
      strengthMeter.style.backgroundColor = strengthColors[strength];
      strengthText.textContent = strengthLabels[strength];
      strengthText.parentElement.className = `strength-meter__text strength-meter__text--${strengthClasses[strength]}`;
    }

    function checkPasswordMatch() {
      const match = passwordInput.value === confirmInput.value;
      const helpText = document.getElementById('passwordMatchHelp');
      if (helpText) {
        helpText.textContent = match ? '' : 'Passwords do not match';
        helpText.className = `form__message ${match ? 'form__message--success' : 'form__message--error'}`;
      }
    }
  }

  function initializeBasicTab() {
    const form = document.getElementById('basicDetailsForm');
    const fileInput = document.getElementById('profileImage');
    const previewContainer = document.querySelector('.image-preview__container');
    const fileText = document.querySelector('.file-upload__text');

    if (fileInput && previewContainer && fileText) {
      fileInput.addEventListener('change', handleFileSelect);
    }

    if (form) {
      form.addEventListener('submit', handleBasicFormSubmit);
    }

    function handleFileSelect(e) {
      const file = e.target.files[0];
      if (file) {
        fileText.textContent = file.name;
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = e => {
            previewContainer.innerHTML = `
              <img src="${e.target.result}" alt="Preview" 
                   style="max-width: 200px; margin-top: 1rem; border-radius: 8px;">
            `;
          };
          reader.readAsDataURL(file);
        }
      }
    }

    function handleBasicFormSubmit(e) {
      e.preventDefault();
      // Add your form submission logic here
      console.log('Basic form submitted');
    }
  }

  function initializeTripsTab() {
    const statusFilter = document.getElementById('statusFilter');
    const searchInput = document.getElementById('searchTrips');
    const tripsBody = document.getElementById('tripsBody');

    if (statusFilter) {
      statusFilter.addEventListener('change', filterTrips);
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterTrips);
    }

    function filterTrips() {
      // Add your trips filtering logic here
      console.log('Filtering trips');
    }
  }

  function initializeDeactivateTab() {
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modal = document.getElementById('deactivateModal');
    const confirmInput = document.getElementById('confirmInput');
    const confirmBtn = document.getElementById('confirmDeactivate');

    if (openModalBtn && modal) {
      openModalBtn.addEventListener('click', () => {
        modal.hidden = false;
        confirmInput.focus();
      });
    }

    if (closeModalBtn && modal) {
      closeModalBtn.addEventListener('click', () => {
        modal.hidden = true;
      });
    }

    if (confirmInput && confirmBtn) {
      confirmInput.addEventListener('input', () => {
        confirmBtn.disabled = confirmInput.value.toLowerCase() !== 'deactivate';
      });
    }
  }

  // Update indicator on window resize
  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.tab-button.active');
    if (activeTab) moveIndicator(activeTab);
  });
});
