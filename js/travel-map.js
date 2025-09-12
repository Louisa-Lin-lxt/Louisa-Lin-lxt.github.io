// 3D地球仪实现
let scene, camera, renderer, globe, controls;
let markers = [];
let currentLang = 'en';
let currentContinent = null;
let currentCountry = null;

// 旅行数据配置
const travelData = {
    asia: {
        en: {
            name: "Asia",
            countries: {
                china: {
                    name: "China",
                    flag: "🇨🇳",
                    places: {
                        sanya: {
                            name: "Sanya",
                            photos: [
                                "images/中国🇨🇳/Sanya |三亚/_S__9396.JPG",
                                "images/中国🇨🇳/Sanya |三亚/_S__9407.JPG",
                                "images/中国🇨🇳/Sanya |三亚/_S__9539.JPG"
                            ]
                        },
                        shangrila: {
                            name: "Shangri-La",
                            photos: [
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_2765.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_2984.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3748.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3750.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3962.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3991.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3997.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_4006.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_4007.jpg"
                            ]
                        },
                        suzhou: {
                            name: "Suzhou",
                            photos: [
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3861.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3880.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3898.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3922.jpg"
                            ]
                        }
                    }
                },
                russia: {
                    name: "Russia",
                    flag: "🇷🇺",
                    places: {
                        baikal: {
                            name: "Lake Baikal",
                            photos: [
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9633.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9634.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9635.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9636.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9637.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9638.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9639.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9640.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9641.JPG"
                            ]
                        }
                    }
                }
            }
        },
        zh: {
            name: "亚洲",
            countries: {
                china: {
                    name: "中国",
                    flag: "🇨🇳",
                    places: {
                        sanya: {
                            name: "三亚",
                            photos: [
                                "images/中国🇨🇳/Sanya |三亚/_S__9396.JPG",
                                "images/中国🇨🇳/Sanya |三亚/_S__9407.JPG",
                                "images/中国🇨🇳/Sanya |三亚/_S__9539.JPG"
                            ]
                        },
                        shangrila: {
                            name: "香格里拉",
                            photos: [
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_2765.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_2984.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3748.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3750.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3962.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3991.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3997.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_4006.jpg",
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_4007.jpg"
                            ]
                        },
                        suzhou: {
                            name: "苏州",
                            photos: [
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3861.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3880.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3898.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3922.jpg"
                            ]
                        }
                    }
                },
                russia: {
                    name: "俄罗斯",
                    flag: "🇷🇺",
                    places: {
                        baikal: {
                            name: "贝加尔湖",
                            photos: [
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9633.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9634.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9635.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9636.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9637.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9638.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9639.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9640.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9641.JPG"
                            ]
                        }
                    }
                }
            }
        }
    },
    europe: {
        en: {
            name: "Europe",
            countries: {
                italy: {
                    name: "Italy",
                    flag: "🇮🇹",
                    places: {
                        rome: {
                            name: "Rome",
                            photos: [
                                "images/意大利🇮🇹/Rome｜罗马/IMG_1684.HEIC",
                                "images/意大利🇮🇹/Rome｜罗马/IMG_9692.JPG"
                            ]
                        },
                        venice: {
                            name: "Venice",
                            photos: [
                                "images/意大利🇮🇹/Venice｜威尼斯/IMG_1614.HEIC",
                                "images/意大利🇮🇹/Venice｜威尼斯/IMG_2216.HEIC"
                            ]
                        },
                        como: {
                            name: "Como",
                            photos: []
                        },
                        florence: {
                            name: "Florence",
                            photos: []
                        },
                        milan: {
                            name: "Milan",
                            photos: []
                        }
                    }
                }
            }
        },
        zh: {
            name: "欧洲",
            countries: {
                italy: {
                    name: "意大利",
                    flag: "🇮🇹",
                    places: {
                        rome: {
                            name: "罗马",
                            photos: [
                                "images/意大利🇮🇹/Rome｜罗马/IMG_1684.HEIC",
                                "images/意大利🇮🇹/Rome｜罗马/IMG_9692.JPG"
                            ]
                        },
                        venice: {
                            name: "威尼斯",
                            photos: [
                                "images/意大利🇮🇹/Venice｜威尼斯/IMG_1614.HEIC",
                                "images/意大利🇮🇹/Venice｜威尼斯/IMG_2216.HEIC"
                            ]
                        },
                        como: {
                            name: "科莫",
                            photos: []
                        },
                        florence: {
                            name: "佛罗伦萨",
                            photos: []
                        },
                        milan: {
                            name: "米兰",
                            photos: []
                        }
                    }
                }
            }
        }
    }
};

// 旅行地点坐标 (纬度, 经度)
const travelLocations = [
    { continent: 'asia', country: 'china', place: 'sanya', lat: 18.2578, lng: 109.5036, name: 'Sanya' },
    { continent: 'asia', country: 'china', place: 'shangrila', lat: 27.8251, lng: 99.7060, name: 'Shangri-La' },
    { continent: 'asia', country: 'china', place: 'suzhou', lat: 31.2989, lng: 120.5853, name: 'Suzhou' },
    { continent: 'asia', country: 'russia', place: 'baikal', lat: 53.2001, lng: 107.8000, name: 'Lake Baikal' },
    { continent: 'europe', country: 'italy', place: 'rome', lat: 41.9028, lng: 12.4964, name: 'Rome' },
    { continent: 'europe', country: 'italy', place: 'venice', lat: 45.4408, lng: 12.3155, name: 'Venice' },
    { continent: 'europe', country: 'italy', place: 'como', lat: 45.8081, lng: 9.0852, name: 'Como' },
    { continent: 'europe', country: 'italy', place: 'florence', lat: 43.7696, lng: 11.2558, name: 'Florence' },
    { continent: 'europe', country: 'italy', place: 'milan', lat: 45.4642, lng: 9.1900, name: 'Milan' }
];

// 初始化3D场景
function initGlobe() {
    const canvas = document.getElementById('globe-canvas');
    const container = canvas.parentElement;
    
    // 创建场景
    scene = new THREE.Scene();
    
    // 创建相机
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 3;
    
    // 创建渲染器
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // 创建地球
    createGlobe();
    
    // 添加标记
    addMarkers();
    
    // 创建控制器
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.minDistance = 1.5;
    controls.maxDistance = 5;
    
    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    
    // 开始渲染循环
    animate();
    
    // 处理窗口大小变化
    window.addEventListener('resize', onWindowResize);
}

function createGlobe() {
    // 创建地球几何体
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    
    // 创建地球材质
    const material = new THREE.MeshPhongMaterial({
        color: 0x4a90e2,
        transparent: true,
        opacity: 0.8,
        shininess: 100
    });
    
    globe = new THREE.Mesh(geometry, material);
    scene.add(globe);
    
    // 添加大气层效果
    const atmosphereGeometry = new THREE.SphereGeometry(1.05, 32, 32);
    const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: 0x87ceeb,
        transparent: true,
        opacity: 0.1,
        side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);
}

function addMarkers() {
    travelLocations.forEach(location => {
        // 将经纬度转换为3D坐标
        const phi = (90 - location.lat) * (Math.PI / 180);
        const theta = (location.lng + 180) * (Math.PI / 180);
        
        const x = 1.1 * Math.sin(phi) * Math.cos(theta);
        const y = 1.1 * Math.cos(phi);
        const z = 1.1 * Math.sin(phi) * Math.sin(theta);
        
        // 创建标记几何体
        const markerGeometry = new THREE.SphereGeometry(0.02, 16, 16);
        const markerMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.9
        });
        
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);
        marker.position.set(x, y, z);
        marker.userData = location;
        
        // 添加发光效果
        const glowGeometry = new THREE.SphereGeometry(0.03, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
            color: 0xff6b6b,
            transparent: true,
            opacity: 0.3
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        marker.add(glow);
        
        // 添加脉冲动画
        const pulseAnimation = () => {
            const time = Date.now() * 0.003;
            const scale = 1 + Math.sin(time) * 0.3;
            marker.scale.setScalar(scale);
        };
        
        // 存储动画函数
        marker.userData.animate = pulseAnimation;
        
        scene.add(marker);
        markers.push(marker);
    });
}

function animate() {
    requestAnimationFrame(animate);
    
    // 更新控制器
    controls.update();
    
    // 更新标记动画
    markers.forEach(marker => {
        if (marker.userData.animate) {
            marker.userData.animate();
        }
    });
    
    // 渲染场景
    renderer.render(scene, camera);
}

function onWindowResize() {
    const container = document.querySelector('.globe-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// 射线检测点击事件
function onMouseClick(event) {
    const mouse = new THREE.Vector2();
    const rect = renderer.domElement.getBoundingClientRect();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    const intersects = raycaster.intersectObjects(markers);
    
    if (intersects.length > 0) {
        const location = intersects[0].object.userData;
        showPlaces(location.continent, location.country);
    }
}

// 显示地点详情
function showPlaces(continentId, countryId) {
    currentContinent = continentId;
    currentCountry = countryId;
    const countryData = travelData[continentId][currentLang].countries[countryId];
    
    // 隐藏地球仪，显示地点面板
    document.querySelector('.globe-container').style.display = 'none';
    document.getElementById('places-panel').classList.add('active');
    
    // 更新标题
    document.getElementById('country-title').textContent = countryData.name;
    
    // 生成地点卡片
    const placesGrid = document.getElementById('places-grid');
    placesGrid.innerHTML = '';
    
    Object.keys(countryData.places).forEach(placeId => {
        const place = countryData.places[placeId];
        const placeCard = document.createElement('div');
        placeCard.className = 'place-card';
        
        let photosHTML = '';
        if (place.photos && place.photos.length > 0) {
            photosHTML = createPhotoGallery(place.photos);
        } else {
            photosHTML = '<div class="coming-soon">敬请期待</div>';
        }
        
        placeCard.innerHTML = `
            <div class="place-name">${place.name}</div>
            <div class="photo-gallery">${photosHTML}</div>
        `;
        
        placesGrid.appendChild(placeCard);
    });
}

function createPhotoGallery(photos) {
    if (photos.length === 0) {
        return '<div class="coming-soon">敬请期待</div>';
    }
    
    const photosPerSlide = 3;
    const totalSlides = Math.ceil(photos.length / photosPerSlide);
    
    let slidesHTML = '';
    for (let i = 0; i < totalSlides; i++) {
        const startIndex = i * photosPerSlide;
        const endIndex = Math.min(startIndex + photosPerSlide, photos.length);
        const slidePhotos = photos.slice(startIndex, endIndex);
        
        let slideHTML = '<div class="photo-slide">';
        slidePhotos.forEach(photo => {
            slideHTML += `
                <div class="photo-item">
                    <img src="${photo}" alt="Travel photo" onerror="this.style.display='none'">
                </div>
            `;
        });
        slideHTML += '</div>';
        slidesHTML += slideHTML;
    }
    
    return `
        <div class="photo-container">
            ${slidesHTML}
        </div>
        ${totalSlides > 1 ? `
            <button class="photo-nav prev" onclick="changeSlide(this, -1)">
                <i class="fas fa-chevron-left"></i>
            </button>
            <button class="photo-nav next" onclick="changeSlide(this, 1)">
                <i class="fas fa-chevron-right"></i>
            </button>
        ` : ''}
    `;
}

function changeSlide(button, direction) {
    const container = button.closest('.photo-gallery').querySelector('.photo-container');
    const slides = container.querySelectorAll('.photo-slide');
    const currentSlide = container.querySelector('.photo-slide:not([style*="display: none"])') || slides[0];
    const currentIndex = Array.from(slides).indexOf(currentSlide);
    const newIndex = currentIndex + direction;
    
    if (newIndex >= 0 && newIndex < slides.length) {
        currentSlide.style.display = 'none';
        slides[newIndex].style.display = 'flex';
        
        // 更新按钮状态
        const prevBtn = container.parentElement.querySelector('.prev');
        const nextBtn = container.parentElement.querySelector('.next');
        prevBtn.disabled = newIndex === 0;
        nextBtn.disabled = newIndex === slides.length - 1;
    }
}

function showMap() {
    document.querySelector('.globe-container').style.display = 'block';
    document.getElementById('countries-panel').classList.remove('active');
    document.getElementById('places-panel').classList.remove('active');
    currentContinent = null;
    currentCountry = null;
}

function updateLanguage() {
    // 更新所有.en和.zh元素的显示
    document.querySelectorAll('.en, .zh').forEach(element => {
        if (element.classList.contains('en')) {
            element.style.display = currentLang === 'en' ? '' : 'none';
        } else if (element.classList.contains('zh')) {
            element.style.display = currentLang === 'zh' ? '' : 'none';
        }
    });
    
    // 如果当前在显示地点，重新渲染
    if (currentContinent && currentCountry) {
        showPlaces(currentContinent, currentCountry);
    }
}

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    currentLang = localStorage.getItem('language') || 'en';
    
    // 初始化3D地球仪
    initGlobe();
    
    // 添加点击事件监听器
    renderer.domElement.addEventListener('click', onMouseClick);
    
    updateLanguage();
});

// 监听语言切换
document.addEventListener('languageChanged', function(event) {
    currentLang = event.detail.language;
    updateLanguage();
});