// 旅行数据
const travelData = {
    asia: {
        en: {
            name: "Asia",
            countries: {
                china: {
                    name: "China🇨🇳",
                    locations: {
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
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3748.jpg"
                            ]
                        },
                        suzhou: {
                            name: "Suzhou",
                            photos: [
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3861.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3880.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3898.jpg"
                            ]
                        }
                    }
                },
                russia: {
                    name: "Russia🇷🇺",
                    locations: {
                        baikal: {
                            name: "Lake Baikal",
                            photos: [
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9633.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9634.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9635.JPG"
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
                    name: "中国🇨🇳",
                    locations: {
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
                                "images/中国🇨🇳/Shangri-La｜香格里拉/ZSL_3748.jpg"
                            ]
                        },
                        suzhou: {
                            name: "苏州",
                            photos: [
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3861.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3880.jpg",
                                "images/中国🇨🇳/Suzhou ｜苏州/DSCF3898.jpg"
                            ]
                        }
                    }
                },
                russia: {
                    name: "俄罗斯🇷🇺",
                    locations: {
                        baikal: {
                            name: "贝加尔湖",
                            photos: [
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9633.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9634.JPG",
                                "images/俄罗斯🇷🇺/Lake Baikal｜贝加尔湖/IMG_9635.JPG"
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
                    name: "Italy🇮🇹",
                    locations: {
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
                            photos: [],
                            comingSoon: true
                        },
                        florence: {
                            name: "Florence",
                            photos: [],
                            comingSoon: true
                        },
                        milan: {
                            name: "Milan",
                            photos: [],
                            comingSoon: true
                        }
                    }
                }
            }
        },
        zh: {
            name: "欧洲",
            countries: {
                italy: {
                    name: "意大利🇮🇹",
                    locations: {
                        rome: {
                            name: "罗马",
                            photos: [
                                "images/意大利🇮🇹/Rome｜罗马/IMG_1684.HEIC",
                                "images/意大利🇮🇹/Venice｜威尼斯/IMG_1614.HEIC"
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
                            photos: [],
                            comingSoon: true
                        },
                        florence: {
                            name: "佛罗伦萨",
                            photos: [],
                            comingSoon: true
                        },
                        milan: {
                            name: "米兰",
                            photos: [],
                            comingSoon: true
                        }
                    }
                }
            }
        }
    }
};

let currentLanguage = 'en';
let currentContinent = null;
let currentCountry = null;

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 设置语言
    currentLanguage = localStorage.getItem('language') || 'en';
    
    // 添加大洲点击事件
    document.querySelectorAll('.continent.visited').forEach(continent => {
        continent.addEventListener('click', function() {
            const continentId = this.dataset.continent;
            showCountries(continentId);
        });
    });
});

// 显示国家
function showCountries(continentId) {
    currentContinent = continentId;
    const continentData = travelData[continentId];
    
    if (!continentData) return;
    
    const countriesContainer = document.getElementById('countries-container');
    const locationsContainer = document.getElementById('locations-container');
    
    // 隐藏位置容器
    locationsContainer.classList.remove('active');
    
    // 清空并填充国家容器
    countriesContainer.innerHTML = '';
    
    const countries = continentData[currentLanguage].countries;
    Object.keys(countries).forEach(countryId => {
        const country = countries[countryId];
        const countryElement = document.createElement('div');
        countryElement.className = 'country';
        countryElement.textContent = country.name;
        countryElement.dataset.country = countryId;
        
        countryElement.addEventListener('click', function() {
            showLocations(countryId);
        });
        
        countriesContainer.appendChild(countryElement);
    });
    
    countriesContainer.classList.add('active');
}

// 显示地点
function showLocations(countryId) {
    currentCountry = countryId;
    const continentData = travelData[currentContinent];
    const countryData = continentData[currentLanguage].countries[countryId];
    
    const locationsContainer = document.getElementById('locations-container');
    locationsContainer.innerHTML = '';
    
    const locations = countryData.locations;
    Object.keys(locations).forEach(locationId => {
        const location = locations[locationId];
        const locationElement = document.createElement('div');
        locationElement.className = 'location';
        
        const locationName = document.createElement('h3');
        locationName.className = 'location-name';
        locationName.textContent = location.name;
        locationElement.appendChild(locationName);
        
        if (location.comingSoon) {
            const comingSoon = document.createElement('div');
            comingSoon.className = 'coming-soon';
            comingSoon.innerHTML = currentLanguage === 'en' ? 'Coming Soon...' : '敬请期待...';
            locationElement.appendChild(comingSoon);
        } else {
            const photosGrid = document.createElement('div');
            photosGrid.className = 'photos-grid';
            
            if (location.photos.length === 0) {
                const noPhotos = document.createElement('div');
                noPhotos.className = 'coming-soon';
                noPhotos.innerHTML = currentLanguage === 'en' ? 'No photos yet...' : '暂无照片...';
                photosGrid.appendChild(noPhotos);
            } else {
                // 显示前3张照片
                const photosToShow = location.photos.slice(0, 3);
                photosToShow.forEach(photoPath => {
                    const photoItem = document.createElement('div');
                    photoItem.className = 'photo-item';
                    
                    const img = document.createElement('img');
                    img.src = photoPath;
                    img.alt = location.name;
                    img.onerror = function() {
                        this.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className = 'coming-soon';
                        placeholder.innerHTML = currentLanguage === 'en' ? 'Photo not found' : '照片未找到';
                        photoItem.appendChild(placeholder);
                    };
                    
                    photoItem.appendChild(img);
                    photosGrid.appendChild(photoItem);
                });
                
                // 如果有更多照片，添加导航按钮
                if (location.photos.length > 3) {
                    const navigation = document.createElement('div');
                    navigation.className = 'photo-navigation';
                    
                    const prevBtn = document.createElement('button');
                    prevBtn.className = 'nav-btn';
                    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
                    prevBtn.onclick = () => showMorePhotos(locationId, -1);
                    
                    const nextBtn = document.createElement('button');
                    nextBtn.className = 'nav-btn';
                    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
                    nextBtn.onclick = () => showMorePhotos(locationId, 1);
                    
                    navigation.appendChild(prevBtn);
                    navigation.appendChild(nextBtn);
                    locationElement.appendChild(navigation);
                }
            }
            
            locationElement.appendChild(photosGrid);
        }
        
        locationsContainer.appendChild(locationElement);
    });
    
    locationsContainer.classList.add('active');
}

// 显示更多照片（翻页功能）
function showMorePhotos(locationId, direction) {
    // 这里可以实现照片翻页逻辑
    console.log('Show more photos for', locationId, 'direction:', direction);
}

// 语言切换时更新内容
function updateTravelContent(lang) {
    currentLanguage = lang;
    
    // 如果当前有显示的内容，重新显示
    if (currentContinent) {
        showCountries(currentContinent);
        if (currentCountry) {
            showLocations(currentCountry);
        }
    }
}

// 重写语言切换函数以包含旅行地图更新
const originalSwitchLanguage = window.switchLanguage;
window.switchLanguage = function() {
    if (originalSwitchLanguage) {
        originalSwitchLanguage();
    }
    updateTravelContent(currentLang);
};
