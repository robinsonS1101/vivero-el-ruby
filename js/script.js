
        // ===== CONFIGURACIÓN DE SUPABASE =====
        const SUPABASE_URL = 'https://pcpdkleznldtycyzgzww.supabase.co';
        const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjcGRrbGV6bmxkdHljeXpnend3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2OTIyMjUsImV4cCI6MjA3MzI2ODIyNX0.GF8dmxWqoTuwGdb4ihJSTzcOXPovEU1K6rkvtv2wF-w';
        
        // Inicializar Supabase
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        
        // Estado de la aplicación
        let currentUser = null;
        let products = [];
        let services = [];
        let currentProductId = null;
        
        // Datos de ejemplo para el dashboard
        const sampleProducts = [
            { id: 1, name: "Árbol de Mango", category: "Frutales", price: 45.00, stock: 25, status: "active", description: "Árbol frutal de mango, variedad Tommy Atkins. Ideal para climas cálidos. Produce frutos dulces y jugosos.", image: "https://images.unsplash.com/photo-1590137899305-5ecdcf10e8a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
            { id: 2, name: "Pino Caribe", category: "Forestales", price: 35.00, stock: 40, status: "active", description: "Árbol forestal de rápido crecimiento, ideal para proyectos de reforestación. Crece hasta 30 metros de altura.", image: "https://images.unsplash.com/photo-1598880791506-1c67c5d1510d?ixlib=rb-4.0.3&id=MnwxMjA3fDB8MHxwaG90by1wYWdlHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
            { id: 3, name: "Abono Orgánico", category: "Insumos", price: 15.00, stock: 100, status: "active", description: "Abono orgánico 100% natural, en presentación de 5kg. Ideal para todo tipo de plantas.", image: "https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
            { id: 4, name: "Árbol de Limón", category: "Frutales", price: 38.00, stock: 0, status: "inactive", description: "Árbol frutal de limón, variedad Tahití. Ideal para climas cálidos y templados. Produce frutos ácidos y jugosos.", image: "https://images.unsplash.com/photo-1590137899305-5ecdcf10e8a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
            { id: 5, name: "Árbol de sapote", category: "Frutales", price: 3200.00, stock: 1000, status: "inactive", description: "Árbol frutal de sapote especial para suelos con poco alimento,.", image: "https://images.unsplash.com/photo-1590137899305-5ecdcf10e8a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" }
        ];
        
        const sampleServices = [
            { id: 1, name: "Asesoría de Plantaciones", description: "Nuestro servicio de asesoría de plantaciones incluye: evaluación del terreno, análisis de suelo, recomendación de especies adecuadas.", price: "Desde $150.000", status: "active", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
            { id: 2, name: "Sistemas de Riego", description: "Diseñamos e instalamos sistemas de riego eficientes adaptados a tus necesidades específicas.", price: "Desde $300.000", status: "active", image: "https://images.unsplash.com/photo-1591637333184-19aa84b301f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" },
            { id: 3, name: "Análisis de Suelos", description: "Realizamos análisis completos de suelo para determinar los nutrientes necesarios para tus cultivos.", price: "Desde $80.000", status: "inactive", image: "https://images.unsplash.com/photo-1589923188937-cb64779f4abe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" }
        ];
        
        // DOM Elements
        const mainContent = document.getElementById('main-content');
        const loginSection = document.getElementById('login-section');
        const dashboardSection = document.getElementById('dashboard-section');
        const showLoginBtn = document.getElementById('show-login-btn');
        const loginBtn = document.getElementById('login-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const loginError = document.getElementById('login-error');
        const productGrid = document.getElementById('product-grid');
        const serviceGrid = document.getElementById('service-grid');
        const detailModal = document.getElementById('detail-modal');
        const closeDetail = document.getElementById('close-detail');
        const detailBody = document.getElementById('detail-body');
        const exploreBtn = document.getElementById('explore-btn');
        const searchInput = document.getElementById('search-input');
        const menuToggle = document.getElementById('menu-toggle');
        const mainNav = document.getElementById('main-nav');
        const bottomNav = document.getElementById('bottom-nav');
        const productsLoader = document.getElementById('products-loader');
        const servicesLoader = document.getElementById('services-loader');
        const connectionNotice = document.getElementById('connection-notice');
        const connectionMessage = document.getElementById('connection-message');
        const adminMenuToggle = document.getElementById('admin-menu-toggle');
        const adminSidebar = document.getElementById('admin-sidebar');
        const menuItems = document.querySelectorAll('.menu-item');
        const crudSections = document.querySelectorAll('.crud-section');
        const adminProductsList = document.getElementById('admin-products-list');
        const adminServicesList = document.getElementById('admin-services-list');
        const productsCount = document.getElementById('products-count');
        const servicesCount = document.getElementById('services-count');
        const ordersCount = document.getElementById('orders-count');
        const usersCount = document.getElementById('users-count');
        const addProductBtn = document.getElementById('add-product-btn');
        const addServiceBtn = document.getElementById('add-service-btn');
        const addProductModal = document.getElementById('add-product-modal');
        const editProductModal = document.getElementById('edit-product-modal');
        const addServiceModal = document.getElementById('add-service-modal');
        const closeModalBtns = document.querySelectorAll('.close-modal');
        const productForm = document.getElementById('product-form');
        const editProductForm = document.getElementById('edit-product-form');
        const serviceForm = document.getElementById('service-form');
        
        // Mostrar notificación de conexión
        function showConnectionNotice(message, isSuccess = true) {
            connectionMessage.textContent = message;
            connectionNotice.className = 'connection-notice ' + (isSuccess ? 'success' : 'error');
            connectionNotice.classList.add('show');
            
            setTimeout(() => {
                connectionNotice.classList.remove('show');
            }, 5000);
        }
        
        // Mostrar notificación general
        function showNotification(message, type = 'success') {
            // Crear elemento de notificación si no existe
            let notification = document.getElementById('general-notification');
            if (!notification) {
                notification = document.createElement('div');
                notification.id = 'general-notification';
                notification.style.cssText = 'position: fixed; bottom: 20px; right: 20px; padding: 15px 20px; border-radius: 5px; color: white; z-index: 1000; opacity: 0; transform: translateY(100px); transition: all 0.3s ease;';
                document.body.appendChild(notification);
            }
            
            notification.textContent = message;
            notification.style.backgroundColor = type === 'success' ? 'var(--success)' : type === 'error' ? 'var(--error)' : 'var(--warning)';
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transform = 'translateY(100px)';
            }, 3000);
        }
        
        // Event Listeners
        showLoginBtn.addEventListener('click', () => {
            loginSection.classList.add('active');
        });
        
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Credenciales por defecto
            if (username === 'admin' && password === 'admin123') {
                loginError.style.display = 'none';
                loginSection.classList.remove('active');
                mainContent.style.display = 'none';
                dashboardSection.style.display = 'block';
                showNotification('Sesión iniciada correctamente como administrador', 'success');
                
                // Cargar datos en el dashboard
                loadAdminProducts();
                loadAdminServices();
            } else {
                loginError.style.display = 'block';
            }
        });
        
        logoutBtn.addEventListener('click', () => {
            dashboardSection.style.display = 'none';
            mainContent.style.display = 'block';
            loginSection.classList.remove('active');
            showNotification('Sesión cerrada correctamente', 'success');
        });
        
        closeDetail.addEventListener('click', () => {
            detailModal.classList.remove('active');
        });
        
        exploreBtn.addEventListener('click', () => {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
        
        searchInput.addEventListener('input', () => {
            filterProducts();
        });
        
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
        
        adminMenuToggle.addEventListener('click', () => {
            adminSidebar.classList.toggle('active');
        });
        
        // Navegación del dashboard
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Quitar active de todos los items
                menuItems.forEach(i => i.classList.remove('active'));
                // Añadir active al item clickeado
                item.classList.add('active');
                
                // Ocultar todas las secciones
                crudSections.forEach(section => section.style.display = 'none');
                
                // Mostrar la sección correspondiente
                const sectionId = item.getAttribute('data-section') + '-content';
                document.getElementById(sectionId).style.display = 'block';
                
                // En móviles, cerrar el sidebar después de seleccionar
                if (window.innerWidth <= 768) {
                    adminSidebar.classList.remove('active');
                }
            });
        });
        
        // Modal de agregar producto
        addProductBtn.addEventListener('click', () => {
            addProductModal.classList.add('active');
        });
        
        addServiceBtn.addEventListener('click', () => {
            addServiceModal.classList.add('active');
        });
        
        // Cerrar modales
        closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                addProductModal.classList.remove('active');
                editProductModal.classList.remove('active');
                addServiceModal.classList.remove('active');
            });
        });
        
        // Envío del formulario de producto
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('product-form')) {
                const newProduct = {
                    name: document.getElementById('product-name').value,
                    category: document.getElementById('product-category').value,
                    price: parseFloat(document.getElementById('product-price').value),
                    stock: parseInt(document.getElementById('product-stock').value),
                    description: document.getElementById('product-description').value,
                    image: document.getElementById('product-image').value || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
                    status: 'active'
                };
                
                addProduct(newProduct);
            }
        });
        
        // Envío del formulario de edición de producto
        editProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('edit-product-form')) {
                const updatedProduct = {
                    name: document.getElementById('edit-product-name').value,
                    category: document.getElementById('edit-product-category').value,
                    price: parseFloat(document.getElementById('edit-product-price').value),
                    stock: parseInt(document.getElementById('edit-product-stock').value),
                    description: document.getElementById('edit-product-description').value,
                    image: document.getElementById('edit-product-image').value,
                    status: document.getElementById('edit-product-status').value
                };
                
                updateProduct(currentProductId, updatedProduct);
            }
        });
        
        // Envío del formulario de servicio
        serviceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('service-form')) {
                const newService = {
                    name: document.getElementById('service-name').value,
                    description: document.getElementById('service-description').value,
                    price: document.getElementById('service-price').value,
                    image: document.getElementById('service-image').value || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fx8&auto=format&fit=crop&w=1770&q=80',
                    status: 'active'
                };
                
                addService(newService);
            }
        });
        
        // Cerrar modal al hacer clic fuera
        window.addEventListener('click', (e) => {
            if (e.target === addProductModal) {
                addProductModal.classList.remove('active');
            }
            if (e.target === editProductModal) {
                editProductModal.classList.remove('active');
            }
            if (e.target === addServiceModal) {
                addServiceModal.classList.remove('active');
            }
            if (e.target === detailModal) {
                detailModal.classList.remove('active');
            }
            if (e.target === loginSection) {
                loginSection.classList.remove('active');
            }
        });
        
        document.getElementById('category').addEventListener('change', filterProducts);
        document.getElementById('price').addEventListener('change', filterProducts);
        document.getElementById('sort').addEventListener('change', filterProducts);
        
        // Cerrar menú al hacer clic en un enlace
        document.querySelectorAll('nav a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
            });
        });
        
        // Navegación inferior
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll('.bottom-nav-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const targetId = item.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
        
        // ===== FUNCIONES PARA CARGAR DATOS DESDE SUPABASE =====
        async function loadProducts() {
            try {
                productsLoader.style.display = 'block';
                
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('name');
                
                if (error) {
                    throw error;
                }
                
                products = data || [];
                renderProducts();
                productsLoader.style.display = 'none';
                showConnectionNotice(`Productos cargados: ${products.length} encontrados`, true);
                
            } catch (error) {
                console.error('Error loading products:', error);
                showConnectionNotice('Error al cargar productos. Mostrando datos de ejemplo.', false);
                loadSampleProducts();
                renderProducts();
                productsLoader.style.display = 'none';
            }
        }
        
        async function loadServices() {
            try {
                servicesLoader.style.display = 'block';
                
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('name');
                
                if (error) {
                    throw error;
                }
                
                services = data || [];
                renderServices();
                servicesLoader.style.display = 'none';
                showConnectionNotice(`Servicios cargados: ${services.length} encontrados`, true);
                
            } catch (error) {
                console.error('Error loading services:', error);
                showConnectionNotice('Error al cargar servicios. Mostrando datos de ejemplo.', false);
                loadSampleServices();
                renderServices();
                servicesLoader.style.display = 'none';
            }
        }
        
        // Cargar productos para el admin
        async function loadAdminProducts() {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('name');
                
                if (error) {
                    throw error;
                }
                
                products = data || sampleProducts;
                renderAdminProducts();
                productsCount.textContent = products.length;
                
            } catch (error) {
                console.error('Error loading products for admin:', error);
                // Usar datos de ejemplo si hay error
                products = sampleProducts;
                renderAdminProducts();
                productsCount.textContent = products.length;
            }
        }
        
        // Cargar servicios para el admin
        async function loadAdminServices() {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .order('name');
                
                if (error) {
                    throw error;
                }
                
                services = data || sampleServices;
                renderAdminServices();
                servicesCount.textContent = services.length;
                
            } catch (error) {
                console.error('Error loading services for admin:', error);
                // Usar datos de ejemplo si hay error
                services = sampleServices;
                renderAdminServices();
                servicesCount.textContent = services.length;
            }
        }
        
        // Datos de ejemplo en caso de error
        function loadSampleProducts() {
            products = sampleProducts;
        }
        
        function loadSampleServices() {
            services = sampleServices;
        }
        
        // Funciones para productos
        function renderProducts() {
            productGrid.innerHTML = '';
            
            if (products.length === 0) {
                productGrid.innerHTML = '<p class="no-products">No hay productos disponibles en este momento.</p>';
                return;
            }
            
            products.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-img" style="background-image: url('${product.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}')"></div>
                    <div class="product-content">
                        <h3>${product.name} ${product.stock < 10 ? '<span class="badge badge-stock">Poco stock</span>' : ''}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <p class="product-description">${product.description}</p>
                        <button class="view-details" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-info-circle"></i> Ver Detalles y Cotizar
                        </button>
                    </div>
                `;
                productGrid.appendChild(card);
            });
        }
        
        function renderAdminProducts() {
            adminProductsList.innerHTML = '';
            
            if (products.length === 0) {
                adminProductsList.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay productos disponibles.</td></tr>';
                return;
            }
            
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>${product.stock}</td>
                    <td>${product.status === 'active' ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-error">Inactivo</span>'}</td>
                    <td class="actions">
                        <button class="btn btn-edit" onclick="editProduct(${product.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-delete" onclick="deleteProduct(${product.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                `;
                adminProductsList.appendChild(row);
            });
        }
        
        function renderServices() {
            serviceGrid.innerHTML = '';
            
            if (services.length === 0) {
                serviceGrid.innerHTML = '<p class="no-services">No hay servicios disponibles en este momento.</p>';
                return;
            }
            
            services.forEach(service => {
                const card = document.createElement('div');
                card.className = 'service-card';
                card.innerHTML = `
                    <div class="service-icon">
                        <i class="fas fa-seedling"></i>
                    </div>
                    <h3>${service.name}</h3>
                    <p>${service.description.substring(0, 100)}...</p>
                    <button class="view-details" onclick="showServiceDetails(${service.id})">
                        <i class="fas fa-info-circle"></i> Ver Detalles
                    </button>
                `;
                serviceGrid.appendChild(card);
            });
        }
        
        function renderAdminServices() {
            adminServicesList.innerHTML = '';
            
            if (services.length === 0) {
                adminServicesList.innerHTML = '<tr><td colspan="6" style="text-align: center;">No hay servicios disponibles.</td></tr>';
                return;
            }
            
            services.forEach(service => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${service.id}</td>
                    <td>${service.name}</td>
                    <td>${service.description.substring(0, 50)}...</td>
                    <td>${service.price}</td>
                    <td>${service.status === 'active' ? '<span class="badge badge-success">Activo</span>' : '<span class="badge badge-error">Inactivo</span>'}</td>
                    <td class="actions">
                        <button class="btn btn-edit" onclick="editService(${service.id})">
                            <i class="fas fa-edit"></i> Editar
                        </button>
                        <button class="btn btn-delete" onclick="deleteService(${service.id})">
                            <i class="fas fa-trash"></i> Eliminar
                        </button>
                    </td>
                `;
                adminServicesList.appendChild(row);
            });
        }
        
        // Funciones de detalles
        window.showProductDetails = function(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                detailBody.innerHTML = `
                    <div class="detail-image">
                        <img src="${product.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}" alt="${product.name}">
                    </div>
                    <div class="detail-info">
                        <h2>${product.name}</h2>
                        <div class="detail-price">$${product.price.toFixed(2)}</div>
                        <p class="detail-description">${product.description}</p>
                        <div class="detail-actions">
                            <button class="whatsapp-btn" onclick="quoteProduct('${product.name}')">
                                <i class="fab fa-whatsapp"></i> Cotizar por WhatsApp
                            </button>
                        </div>
                    </div>
                `;
                detailModal.classList.add('active');
            }
        };
        
        window.showServiceDetails = function(serviceId) {
            const service = services.find(s => s.id === serviceId);
            if (service) {
                detailBody.innerHTML = `
                    <div class="detail-image">
                        <img src="${service.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}" alt="${service.name}">
                    </div>
                    <div class="detail-info">
                        <h2>${service.name}</h2>
                        <div class="detail-price">${service.price}</div>
                        <p class="detail-description">${service.description}</p>
                        <div class="detail-actions">
                            <button class="whatsapp-btn" onclick="quoteService('${service.name}')">
                                <i class="fab fa-whatsapp"></i> Cotizar por WhatsApp
                            </button>
                        </div>
                    </div>
                `;
                detailModal.classList.add('active');
            }
        };
        
        window.quoteProduct = function(productName) {
            const message = `Hola, me interesa cotizar el producto: ${productName}`;
            window.open(`https://wa.me/573178714546?text=${encodeURIComponent(message)}`, '_blank');
        };
        
        window.quoteService = function(serviceName) {
            const message = `Hola, me interesa cotizar el servicio: ${serviceName}`;
            window.open(`https://wa.me/573178714546?text=${encodeURIComponent(message)}`, '_blank');
        };
        
        // Funciones de administración
        window.editProduct = function(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                currentProductId = productId;
                
                // Llenar el formulario con los datos del producto
                document.getElementById('edit-product-id').value = product.id;
                document.getElementById('edit-product-name').value = product.name;
                document.getElementById('edit-product-category').value = product.category;
                document.getElementById('edit-product-price').value = product.price;
                document.getElementById('edit-product-stock').value = product.stock;
                document.getElementById('edit-product-description').value = product.description;
                document.getElementById('edit-product-image').value = product.image || '';
                document.getElementById('edit-product-status').value = product.status;
                
                // Mostrar el modal de edición
                editProductModal.classList.add('active');
            }
        };
        
        window.deleteProduct = function(productId) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                const index = products.findIndex(p => p.id === productId);
                if (index !== -1) {
                    products.splice(index, 1);
                    renderAdminProducts();
                    showNotification('Producto eliminado correctamente', 'success');
                }
            }
        };
        
        window.editService = function(serviceId) {
            const service = services.find(s => s.id === serviceId);
            if (service) {
                showNotification(`Editando servicio: ${service.name}`, 'warning');
                // Aquí se abriría el modal de edición de servicios
            }
        };
        
        window.deleteService = function(serviceId) {
            if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
                const index = services.findIndex(s => s.id === serviceId);
                if (index !== -1) {
                    services.splice(index, 1);
                    renderAdminServices();
                    showNotification('Servicio eliminado correctamente', 'success');
                }
            }
        };
        
        window.editOrder = function(orderId) {
            showNotification(`Editando pedido: #${orderId}`, 'warning');
        };
        
        window.deleteOrder = function(orderId) {
            if (confirm('¿Estás seguro de que quieres eliminar este pedido?')) {
                showNotification(`Pedido #${orderId} eliminado`, 'success');
            }
        };
        
        window.editUser = function(userId) {
            showNotification(`Editando usuario: #${userId}`, 'warning');
        };
        
        window.deleteUser = function(userId) {
            if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                showNotification(`Usuario #${userId} eliminado`, 'success');
            }
        };
        
        window.saveSettings = function() {
            showNotification('Configuración guardada correctamente', 'success');
        };
        
        // Funciones CRUD para productos
        async function addProduct(productData) {
            try {
                // En una implementación real, aquí se haría la inserción en Supabase
                // const { data, error } = await supabase
                //     .from('products')
                //     .insert([productData]);
                
                // if (error) throw error;
                
                // Para esta demo, simulamos la inserción
                const newProduct = {
                    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                    ...productData
                };
                
                products.push(newProduct);
                renderAdminProducts();
                addProductModal.classList.remove('active');
                productForm.reset();
                
                showNotification('Producto agregado correctamente', 'success');
                
            } catch (error) {
                console.error('Error adding product:', error);
                showNotification('Error al agregar el producto: ' + error.message, 'error');
            }
        }
        
        async function updateProduct(productId, productData) {
            try {
                // En una implementación real, aquí se haría la actualización en Supabase
                // const { data, error } = await supabase
                //     .from('products')
                //     .update(productData)
                //     .eq('id', productId);
                
                // if (error) throw error;
                
                // Para esta demo, simulamos la actualización
                const index = products.findIndex(p => p.id === productId);
                if (index !== -1) {
                    products[index] = { ...products[index], ...productData };
                    renderAdminProducts();
                    editProductModal.classList.remove('active');
                    
                    showNotification('Producto actualizado correctamente', 'success');
                }
                
            } catch (error) {
                console.error('Error updating product:', error);
                showNotification('Error al actualizar el producto: ' + error.message, 'error');
            }
        }
        
        async function addService(serviceData) {
            try {
                // En una implementación real, aquí se haría la inserción en Supabase
                // const { data, error } = await supabase
                //     .from('services')
                //     .insert([serviceData]);
                
                // if (error) throw error;
                
                // Para esta demo, simulamos la inserción
                const newService = {
                    id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1,
                    ...serviceData
                };
                
                services.push(newService);
                renderAdminServices();
                addServiceModal.classList.remove('active');
                serviceForm.reset();
                
                showNotification('Servicio agregado correctamente', 'success');
                
            } catch (error) {
                console.error('Error adding service:', error);
                showNotification('Error al agregar el servicio: ' + error.message, 'error');
            }
        }
        
        // Validación de formularios
        function validateForm(formId) {
            const form = document.getElementById(formId);
            const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                if (!input.value.trim()) {
                    formGroup.classList.add('error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('error');
                    
                    // Validación adicional para campos numéricos
                    if (input.type === 'number' && isNaN(input.value)) {
                        formGroup.classList.add('error');
                        isValid = false;
                    }
                }
            });
            
            return isValid;
        }
        
        // Filtrado de productos
        function filterProducts() {
            const categoryFilter = document.getElementById('category').value;
            const priceFilter = document.getElementById('price').value;
            const sortFilter = document.getElementById('sort').value;
            const searchText = searchInput.value.toLowerCase();
            
            let filteredProducts = products.filter(product => {
                // Filtro por categoría
                if (categoryFilter && product.category !== categoryFilter) {
                    return false;
                }
                
                // Filtro por precio
                if (priceFilter) {
                    if (priceFilter === '100+') {
                        if (product.price < 100) return false;
                    } else {
                        const [min, max] = priceFilter.split('-').map(Number);
                        if (product.price < min || product.price > max) {
                            return false;
                        }
                    }
                }
                
                // Filtro por búsqueda
                if (searchText && !product.name.toLowerCase().includes(searchText) && 
                    !product.description.toLowerCase().includes(searchText)) {
                    return false;
                }
                
                return true;
            });
            
            // Ordenar productos
            if (sortFilter === 'name') {
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortFilter === 'price-asc') {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (sortFilter === 'price-desc') {
                filteredProducts.sort((a, b) => b.price - a.price);
            }
            
            // Mostrar productos filtrados
            productGrid.innerHTML = '';
            
            if (filteredProducts.length === 0) {
                productGrid.innerHTML = '<p class="no-products">No se encontraron productos que coincidan con los filtros.</p>';
                return;
            }
            
            filteredProducts.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.innerHTML = `
                    <div class="product-img" style="background-image: url('${product.image || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'}')"></div>
                    <div class="product-content">
                        <h3>${product.name} ${product.stock < 10 ? '<span class="badge badge-stock">Poco stock</span>' : ''}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <p class="product-description">${product.description}</p>
                        <button class="view-details" onclick="showProductDetails(${product.id})">
                            <i class="fas fa-info-circle"></i> Ver Detalles y Cotizar
                        </button>
                    </div>
                `;
                productGrid.appendChild(card);
            });
        }
        
        // Inicializar la página
        document.addEventListener('DOMContentLoaded', function() {
            // Probar conexión con Supabase primero
            supabase.from('products').select('count').then(({ error }) => {
                if (error) {
                    console.error('Error conectando con Supabase:', error);
                    showConnectionNotice('Error de conexión con la base de datos. Usando datos de ejemplo.', false);
                    loadSampleProducts();
                    loadSampleServices();
                    renderProducts();
                    renderServices();
                } else {
                    showConnectionNotice('Conectado a Supabase correctamente. Cargando datos...', true);
                    loadProducts();
                    loadServices();
                }
            }).catch(error => {
                console.error('Error inesperado:', error);
                showConnectionNotice('Error inesperado. Usando datos de ejemplo.', false);
                loadSampleProducts();
                loadSampleServices();
                renderProducts();
                renderServices();
            });
            
            // Inicializar datos del dashboard
            ordersCount.textContent = '24';
            usersCount.textContent = '156';
            
            // Animaciones de scroll
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Detectar si es un dispositivo móvil
            function isMobileDevice() {
                return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
            }

            // Mostrar u ocultar navegación inferior según el dispositivo
            if (isMobileDevice()) {
                bottomNav.style.display = 'flex';
                
                // Ocultar navegación inferior al hacer scroll hacia abajo
                let lastScrollTop = 0;
                window.addEventListener('scroll', function() {
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                    if (scrollTop > lastScrollTop && scrollTop > 100) {
                        bottomNav.style.transform = 'translateY(100%)';
                    } else {
                        bottomNav.style.transform = 'translateY(0)';
                    }
                    lastScrollTop = scrollTop;
                });
            } else {
                bottomNav.style.display = 'none';
            }
        });