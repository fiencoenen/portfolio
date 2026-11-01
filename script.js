/* ==========================================================================
   PORTFOLIO FIEN — APPLICATION SCRIPT (script.js)
   ========================================================================== */

(function () {
  'use strict';

  const app = document.getElementById('app');
  let carouselInterval = null;

  /* ------------------------------------------------------------------------
     1. START SCREEN CAROUSEL ASSETS & PRE-DECODING
     ------------------------------------------------------------------------ */

  const startScreenImages = [
    { src: './images/startscreen_1.png', alt: 'Start screen image 1 — Kòrsou', sizeClass: 'carousel-img--1' },
    { src: './images/startscreen_2.png', alt: 'Start screen image 2 — Cinco', sizeClass: 'carousel-img--2' },
    { src: './images/startscreen_3.png', alt: 'Start screen image 3 — Haakwerk', sizeClass: 'carousel-img--3' },
    { src: './images/startscreen_4.png', alt: 'Start screen image 4 — Nijntje in Nederland nu', sizeClass: 'carousel-img--4' },
    { src: './images/startscreen_5.png', alt: 'Start screen image 5 — Manifest voor de Onzichtbare Student', sizeClass: 'carousel-img--5' }
  ];

  function preloadStartScreenImages() {
    startScreenImages.forEach(function (item) {
      const img = new Image();
      img.decoding = 'sync';
      img.src = item.src;
      if (typeof img.decode === 'function') {
        img.decode().catch(function () {});
      }
    });
  }

  /* ------------------------------------------------------------------------
     2. MENU PROJECTS DATA & FILTER STATE
     ------------------------------------------------------------------------ */

  const menuProjects = [
    {
      menuIndex: 1,
      title: 'Nijntje in Nederland nu',
      category: 'Academic',
      genre: 'Art & Design',
      subtitle: 'Academic, Art & Design',
      image: './images/menu1.png',
      route: '#/projects/1/information',
      cardClass: 'menu-project-card--1'
    },
    {
      menuIndex: 2,
      title: 'Haakwerk',
      category: 'Personal',
      genre: 'Craftwork',
      subtitle: 'Personal, Craftwork',
      image: './images/menu2.png',
      route: '#/projects/2/information',
      cardClass: 'menu-project-card--2'
    },
    {
      menuIndex: 3,
      title: 'Cinco',
      category: 'Personal',
      genre: 'Craftwork',
      subtitle: 'Personal, Craftwork',
      image: './images/menu3.png',
      route: '#/projects/3/information',
      cardClass: 'menu-project-card--3'
    },
    {
      menuIndex: 4,
      title: 'Kòrsou',
      category: 'Personal',
      genre: 'Craftwork',
      subtitle: 'Personal, Craftwork',
      image: './images/menu4.png',
      route: '#/projects/5/information',
      cardClass: 'menu-project-card--4'
    },
    {
      menuIndex: 5,
      title: 'Manifest voor de Onzichtbare Student',
      category: 'Academic',
      genre: 'Art & Design',
      subtitle: 'Academic, Art & Design',
      image: './images/menu5.png',
      route: '#/projects/4/information',
      cardClass: 'menu-project-card--5'
    }
  ];

  let activeCategory = 'All';
  let activeGenre = 'All';

  /* ------------------------------------------------------------------------
     3. PROJECT INFORMATION PAGES DATA
     ------------------------------------------------------------------------ */

  const projectPages = {
    '1': {
      title: 'Nijntje in Nederland nu',
      categoryGenre: 'Academic, Art & Design',
      year: '2026',
      introWidthClass: 'w-p1-intro',
      paragraphs: [
        'In media, tourism, and children’s books, national identity is often reduced to a nostalgic past defined by windmills, tulips and clogs, ignoring the diverse reality of modern life. <em>Nijntje in Nederland Nu</em> is my redesign of the classic picture book <em>Nijntje in Nederland</em>, created to challenge this romanticized image.',
        'In this contemporary edition, Nijntje navigates a multicultural society featuring diverse communities, modern rituals, and today’s urban landscape. By preserving Dick Bruna’s iconic, minimalist style while embedding it in present-day life, the project creates an intriguing friction between expectation and reality.',
        'The result is a thought-provoking design that allows a broader audience to see themselves represented while sparking a necessary conversation: what does Dutch identity actually mean today?'
      ],
      processRoute: '#/projects/1/information/process',
      images: [
        { src: './images/project1_1.png', alt: 'Nijntje in Nederland nu — image 1', widthClass: 'w-p1-img1' },
        { src: './images/project1_2.png', alt: 'Nijntje in Nederland nu — image 2', widthClass: 'w-p1-spread' },
        { src: './images/project1_3.png', alt: 'Nijntje in Nederland nu — image 3', widthClass: 'w-p1-spread' },
        { src: './images/project1_4.png', alt: 'Nijntje in Nederland nu — image 4', widthClass: 'w-p1-spread' },
        { src: './images/project1_5.png', alt: 'Nijntje in Nederland nu — image 5', widthClass: 'w-p1-spread' },
        { src: './images/project1_6.png', alt: 'Nijntje in Nederland nu — image 6', widthClass: 'w-p1-spread' },
        { src: './images/project1_7.png', alt: 'Nijntje in Nederland nu — image 7', widthClass: 'w-p1-spread' },
        { src: './images/project1_8.png', alt: 'Nijntje in Nederland nu — image 8', widthClass: 'w-p1-spread' },
        { src: './images/project1_9.png', alt: 'Nijntje in Nederland nu — image 9', widthClass: 'w-p1-spread' }
      ]
    },
    '2': {
      title: 'Haakwerk',
      categoryGenre: 'Personal, Craftwork',
      year: '2024',
      introWidthClass: 'w-p2-intro',
      paragraphs: [
        'A collection of crochet tops i made, exploring different techniques and patterns.'
      ],
      processRoute: null,
      images: [
        { src: './images/project2_1.png', alt: 'Haakwerk — image 1', widthClass: 'w-p2-img' },
        { src: './images/project2_2.png', alt: 'Haakwerk — image 2', widthClass: 'w-p2-img' },
        { src: './images/project2_3.png', alt: 'Haakwerk — image 3', widthClass: 'w-p2-img' },
        { src: './images/project2_4.png', alt: 'Haakwerk — image 4', widthClass: 'w-p2-img' },
        { src: './images/project2_5.png', alt: 'Haakwerk — image 5', widthClass: 'w-p2-img' },
        { src: './images/project2_6.png', alt: 'Haakwerk — image 6', widthClass: 'w-p2-img' },
        { src: './images/project2_7.png', alt: 'Haakwerk — image 7', widthClass: 'w-p2-img' }
      ]
    },
    '3': {
      title: 'Cinco',
      categoryGenre: 'Personal, Craftwork',
      year: '2026',
      introWidthClass: 'w-p3-intro',
      paragraphs: [
        'A lino print to honor my childhood cat <em>Cinco.</em> Stamp is made up of linoleum, handdrawn and cut-out by me.'
      ],
      processRoute: null,
      images: [
        { src: './images/project3_1.png', alt: 'Cinco — image 1', widthClass: 'w-p3-img1' },
        { src: './images/project3_2.png', alt: 'Cinco — image 2', widthClass: 'w-p3-img2' },
        { src: './images/project3_3.png', alt: 'Cinco — image 3', widthClass: 'w-p3-img3' }
      ]
    },
    '4': {
      title: 'Manifest voor de Onzichtbare Student',
      categoryGenre: 'Academic, Art & Design',
      year: '2026',
      introWidthClass: 'w-p4-intro',
      paragraphs: [
        'Breda is marketed as a vibrant student city, yet the reality of student life can be far more isolting than expected. <em>Manifest voor de Onzichtbare Student</em> explores the gap between the promise of connection and the loneliness experienced by students who move to the city without an existing social network.',
        'Through a visual contrast between Breda’s lively public image and the private realities of student life, the manifesto exposes the lack of spaces and opportunities for meaningful social connection. By bringing these often overlooked experiences to light, the project challenges the way Breda presents itself as a student city. It serves as a call to action for the city and its educational institutions to rethink how students are welcomed and how a stronger sense of beloning can be created.'
      ],
      processRoute: '#/projects/4/information/process',
      images: [
        { src: './images/project4_1.png', alt: 'Manifest voor de Onzichtbare Student — image 1', widthClass: 'w-p4-img' },
        { src: './images/project4_2.png', alt: 'Manifest voor de Onzichtbare Student — image 2', widthClass: 'w-p4-img' },
        { src: './images/project4_3.png', alt: 'Manifest voor de Onzichtbare Student — image 3', widthClass: 'w-p4-img' },
        { src: './images/project4_4.png', alt: 'Manifest voor de Onzichtbare Student — image 4', widthClass: 'w-p4-img' },
        { src: './images/project4_5.png', alt: 'Manifest voor de Onzichtbare Student — image 5', widthClass: 'w-p4-img' },
        { src: './images/project4_6.png', alt: 'Manifest voor de Onzichtbare Student — image 6', widthClass: 'w-p4-img' }
      ]
    },
    '5': {
      title: 'Kòrsou',
      categoryGenre: 'Personal, Craftwork',
      year: '2025',
      introWidthClass: 'w-p5-intro',
      mainExtraClass: 'project-main--p5',
      paragraphs: [
        'My first filet crochet project made as a reminder of home'
      ],
      processRoute: null,
      images: [
        {
          src: './images/project5_1.png',
          fallbackSrc: './images/menu4.png',
          alt: 'Kòrsou — image 1',
          widthClass: 'w-p5-img'
        }
      ]
    }
  };

  /* ------------------------------------------------------------------------
     4. PROCESS PAGES DATA (PROJECT 1 & PROJECT 4 ONLY)
     ------------------------------------------------------------------------ */

  const processPages = {
    '1': {
      returnRoute: '#/projects/1/information',
      mainExtraClass: '',
      sections: [
        {
          caption: 'What if Nijntje were to travel through the Netherlands as it is today, rather than the nostalgic Netherlands depicted in children’s books?',
          captionWidthClass: 'w-p1proc-1',
          images: [
            { src: './images/project1_process1.png', alt: 'Project 1 process 1', widthClass: 'w-p1proc-1' },
            { src: './images/project1_process2.png', alt: 'Project 1 process 2', widthClass: 'w-p1proc-2' },
            { src: './images/project1_process3.png', alt: 'Project 1 process 3', widthClass: 'w-p1proc-2' }
          ]
        },
        {
          caption: 'A visual prototype, exploring the concept and potential structure of the book',
          captionWidthClass: 'w-p1proc-4',
          images: [
            { src: './images/project1_process4.png', alt: 'Project 1 process 4', widthClass: 'w-p1proc-4' },
            { src: './images/project1_process5.png', alt: 'Project 1 process 5', widthClass: 'w-p1proc-5' },
            { src: './images/project1_process6.png', alt: 'Project 1 process 6', widthClass: 'w-p1proc-5' },
            { src: './images/project1_process7.png', alt: 'Project 1 process 7', widthClass: 'w-p1proc-5' }
          ]
        },
        {
          caption: 'First draft of selected pages that bring the idea to life and testing which content best fits the concept',
          captionWidthClass: 'w-p1proc-8',
          images: [
            { src: './images/project1_process8.png', alt: 'Project 1 process 8', widthClass: 'w-p1proc-8' },
            { src: './images/project1_process9.png', alt: 'Project 1 process 9', widthClass: 'w-p1proc-8' }
          ]
        }
      ]
    },
    '4': {
      returnRoute: '#/projects/4/information',
      mainExtraClass: 'process-main--p4',
      sections: [
        {
          caption: 'A moodboard exploring the reality of being a newcomer in Breda, highlighting the contrast between the lively student city image and the loneliness and social isolation some students experience.',
          captionWidthClass: 'w-p4proc-1',
          images: [
            { src: './images/project4_process1.png', alt: 'Project 4 process 1', widthClass: 'w-p4proc-1' }
          ]
        },
        {
          caption: 'An initial booklet concept intended to offer comfort and recognition to students, using a visual contrast between the expectations and reality of student life in Breda',
          captionWidthClass: 'w-p4proc-2',
          images: [
            { src: './images/project4_process2.png', alt: 'Project 4 process 2', widthClass: 'w-p4proc-2' }
          ]
        },
        {
          caption: 'The concept evolved into a manifesto, acting as a call to action for Breda’s decision-makers, highlighting student loneliness and urging greater attention to social connection and a sense of belonging',
          captionWidthClass: 'w-p4proc-3',
          images: [
            { src: './images/project4_process3.png', alt: 'Project 4 process 3', widthClass: 'w-p4proc-3' }
          ]
        },
        {
          caption: 'Photographs taken by me of student rooms and public spaces with untapped potential for social connection, capturing the reality of student life in Breda',
          captionWidthClass: 'w-p4proc-landscape',
          images: [
            { src: './images/project4_process4.png', alt: 'Project 4 process 4', widthClass: 'w-p4proc-landscape' },
            { src: './images/project4_process5.png', alt: 'Project 4 process 5', widthClass: 'w-p4proc-landscape' },
            { src: './images/project4_process6.png', alt: 'Project 4 process 6', widthClass: 'w-p4proc-landscape' },
            { src: './images/project4_process7.png', alt: 'Project 4 process 7', widthClass: 'w-p4proc-portrait' },
            { src: './images/project4_process8.png', alt: 'Project 4 process 8', widthClass: 'w-p4proc-landscape' },
            { src: './images/project4_process9.png', alt: 'Project 4 process 9', widthClass: 'w-p4proc-landscape' },
            { src: './images/project4_process10.png', alt: 'Project 4 process 10', widthClass: 'w-p4proc-portrait' }
          ]
        },
        {
          caption: 'Qoutes from students sharing their experiences of living in Breda, adding a personal, diary-like feel that gives voice to their individual stories',
          captionWidthClass: 'w-p4proc-11',
          images: [
            { src: './images/project4_process11.png', alt: 'Project 4 process 11', widthClass: 'w-p4proc-11' }
          ]
        }
      ]
    }
  };

  /* ------------------------------------------------------------------------
     5. SHARED HEADER & FOOTER RENDERERS
     ------------------------------------------------------------------------ */

  function renderHeader(leftHtml, rightHtml) {
    return (
      '<header class="global-header">' +
        '<div class="header-left">' + (leftHtml || '') + '</div>' +
        '<div class="header-right">' + (rightHtml || '') + '</div>' +
      '</header>'
    );
  }

  function renderFooter() {
    return (
      '<footer class="global-footer">' +
        'All rights reserved &copy; 2026' +
      '</footer>'
    );
  }

  function clearCarouselInterval() {
    if (carouselInterval !== null) {
      clearInterval(carouselInterval);
      carouselInterval = null;
    }
  }

  /* ------------------------------------------------------------------------
     6. PAGE RENDERERS
     ------------------------------------------------------------------------ */

  function renderStartScreen() {
    let currentIndex = 0;

    const slidesHtml = startScreenImages.map(function (item, idx) {
      const activeClass = idx === 0 ? ' is-active' : '';
      return (
        '<img class="carousel-img ' + item.sizeClass + activeClass + '" ' +
          'src="' + item.src + '" ' +
          'alt="' + item.alt + '" ' +
          'loading="eager" ' +
          'decoding="sync">'
      );
    }).join('');

    app.innerHTML =
      '<div class="page page--start">' +
        '<header class="global-header">' +
          '<div class="header-left header-left--start">' +
            '<a href="#/projects/menu" class="nav-link">projects</a>' +
          '</div>' +
          '<span class="home-name">Fien Coenen</span>' +
          '<div class="header-right">' +
            '<a href="#/about" class="nav-link">about</a>' +
          '</div>' +
        '</header>' +
        '<main class="start-main">' +
          '<div class="carousel-stage">' +
            slidesHtml +
          '</div>' +
        '</main>' +
        renderFooter() +
      '</div>';

    const slideEls = app.querySelectorAll('.carousel-img');
    carouselInterval = setInterval(function () {
      if (!slideEls || slideEls.length === 0) {
        return;
      }
      slideEls[currentIndex].classList.remove('is-active');
      currentIndex = (currentIndex + 1) % slideEls.length;
      slideEls[currentIndex].classList.add('is-active');
    }, 3000);
  }

  function renderMenuPage() {
    const categories = ['All', 'Academic', 'Personal'];
    const genres = [
      { label: 'All', value: 'All' },
      { label: 'Art & Design', value: 'Art & Design' },
      { label: 'Craftwork', value: 'Craftwork' },
      { label: 'Other', value: 'Other' }
    ];

    const categoryButtonsHtml = categories.map(function (cat, idx) {
      const isActive = activeCategory === cat ? ' active' : '';
      const comma = idx < categories.length - 1 ? ',' : '';
      return (
        '<span class="filter-item">' +
          '<button type="button" class="filter-btn' + isActive + '" data-filter-type="category" data-filter-value="' + cat + '">' +
            cat +
          '</button>' + comma +
        '</span>'
      );
    }).join('');

    const genreButtonsHtml = genres.map(function (gen, idx) {
      const isActive = activeGenre === gen.value ? ' active' : '';
      const comma = idx < genres.length - 1 ? ',' : '';
      return (
        '<span class="filter-item">' +
          '<button type="button" class="filter-btn' + isActive + '" data-filter-type="genre" data-filter-value="' + gen.value + '">' +
            gen.label +
          '</button>' + comma +
        '</span>'
      );
    }).join('');

    const filteredProjects = menuProjects.filter(function (proj) {
      const matchCat = activeCategory === 'All' || proj.category === activeCategory;
      const matchGen = activeGenre === 'All' || proj.genre === activeGenre;
      return matchCat && matchGen;
    });

    let projectsHtml = '';
    if (filteredProjects.length === 0) {
      projectsHtml = '<div class="menu-empty">No projects found in this category/genre.</div>';
    } else {
      projectsHtml = filteredProjects.map(function (proj) {
        return (
          '<a href="' + proj.route + '" class="menu-project-card ' + proj.cardClass + '">' +
            '<img src="' + proj.image + '" alt="' + proj.title + '">' +
            '<div class="menu-project-meta">' +
              '<div class="menu-project-title">' + proj.title + '</div>' +
              '<div class="menu-project-sub">' + proj.subtitle + '</div>' +
            '</div>' +
          '</a>'
        );
      }).join('');
    }

    app.innerHTML =
      '<div class="page page--menu">' +
        renderHeader('<a href="#/" class="nav-link">(return to main page)</a>', '') +
        '<section class="menu-filters" aria-label="Project filters">' +
          '<div class="filter-row">' +
            '<span class="filter-label">category</span>' +
            '<div class="filter-options">' + categoryButtonsHtml + '</div>' +
          '</div>' +
          '<div class="filter-row">' +
            '<span class="filter-label">genre</span>' +
            '<div class="filter-options">' + genreButtonsHtml + '</div>' +
          '</div>' +
        '</section>' +
        '<main class="menu-projects">' +
          projectsHtml +
        '</main>' +
        renderFooter() +
      '</div>';

    const filterBtns = app.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const type = btn.getAttribute('data-filter-type');
        const value = btn.getAttribute('data-filter-value');
        if (type === 'category') {
          activeCategory = (activeCategory === value && value !== 'All') ? 'All' : value;
        } else if (type === 'genre') {
          activeGenre = (activeGenre === value && value !== 'All') ? 'All' : value;
        }
        renderMenuPage();
      });
    });
  }

  function renderProjectInfoPage(projectId) {
    const project = projectPages[projectId];
    if (!project) {
      renderNotFound();
      return;
    }

    const paragraphsHtml = project.paragraphs.map(function (p) {
      return '<p>' + p + '</p>';
    }).join('');

    const processLinkHtml = project.processRoute
      ? '<div class="process-link-wrap"><a href="' + project.processRoute + '" class="process-link">(view process)</a></div>'
      : '';

    const imagesHtml = project.images.map(function (imgObj) {
      const onErrorAttr = imgObj.fallbackSrc
        ? ' onerror="this.onerror=null;this.src=\'' + imgObj.fallbackSrc + '\';"'
        : '';
      return (
        '<div class="project-image-item ' + imgObj.widthClass + '">' +
          '<img src="' + imgObj.src + '" alt="' + imgObj.alt + '"' + onErrorAttr + '>' +
        '</div>'
      );
    }).join('');

    const mainClass = 'project-main' + (project.mainExtraClass ? ' ' + project.mainExtraClass : '');

    app.innerHTML =
      '<div class="page page--project">' +
        renderHeader('<a href="#/projects/menu" class="nav-link">(return to projects)</a>', '') +
        '<main class="' + mainClass + '">' +
          '<div class="project-intro-block ' + project.introWidthClass + '">' +
            '<h1 class="project-title">' + project.title + '</h1>' +
            '<div class="project-category">' + project.categoryGenre + '</div>' +
            '<div class="project-year">' + project.year + '</div>' +
            '<div class="project-description">' + paragraphsHtml + '</div>' +
            processLinkHtml +
          '</div>' +
          '<div class="project-images">' +
            imagesHtml +
          '</div>' +
        '</main>' +
        renderFooter() +
      '</div>';
  }

  function renderProcessPage(projectId) {
    const proc = processPages[projectId];
    if (!proc) {
      renderNotFound();
      return;
    }

    const sectionsHtml = proc.sections.map(function (sec) {
      const imgsHtml = sec.images.map(function (imgObj) {
        return '<img class="' + imgObj.widthClass + '" src="' + imgObj.src + '" alt="' + imgObj.alt + '">';
      }).join('');

      return (
        '<section class="process-section">' +
          '<div class="process-caption ' + sec.captionWidthClass + '">' + sec.caption + '</div>' +
          '<div class="process-images">' +
            imgsHtml +
          '</div>' +
        '</section>'
      );
    }).join('');

    const mainClass = 'process-main' + (proc.mainExtraClass ? ' ' + proc.mainExtraClass : '');

    app.innerHTML =
      '<div class="page page--process">' +
        renderHeader('<a href="' + proc.returnRoute + '" class="nav-link">(return to project)</a>', '') +
        '<main class="' + mainClass + '">' +
          sectionsHtml +
        '</main>' +
        renderFooter() +
      '</div>';
  }

  function renderAboutPage() {
    app.innerHTML =
      '<div class="page page--about">' +
        renderHeader('<a href="#/" class="nav-link">(return to main page)</a>', '') +
        '<main class="about-main">' +
          '<div class="about-contact">' +
            '<div><a href="mailto:fienjannacoenen@gmail.com" class="contact-link">fienjannacoenen@gmail.com</a></div>' +
            '<div><a href="tel:+31634263655" class="contact-link">+31634263655</a></div>' +
            '<div><a href="https://www.instagram.com/fienco3nen/" target="_blank" rel="noopener noreferrer" class="contact-link">@fienco3nen</a></div>' +
            '<div>Breda, Netherlands</div>' +
          '</div>' +
          '<div class="about-bottom">' +
            '<div class="about-logo-wrap">' +
              '<img src="./images/logo.png" alt="Fien logo">' +
            '</div>' +
            '<div class="about-bio">' +
              '<p><strong>Fien Coenen (b. 2006)</strong>, a Communication &amp; Multimedia Design student with a love for graphic design, craftwork and visual storytelling.</p>' +
              '<p>I’ve always enjoyed making things and finding different ways to bring an idea to life. I like to work from subjects that interest me personally, especially when they have something to say. I’m drawn to work that can make people look at something a little differently, whether that is through a playful concept or a strong visual.</p>' +
              '<p>My work moves between digital and analogue ways of making. I enjoy experimenting with different techniques and discovering new ways to express an idea. I’m always curious to see where an idea can take me and how i can develop it further through making.</p>' +
            '</div>' +
          '</div>' +
        '</main>' +
        renderFooter() +
      '</div>';
  }

  function renderNotFound() {
    app.innerHTML =
      '<div class="page">' +
        renderHeader('<a href="#/" class="nav-link">(return to main page)</a>', '') +
        '<main class="not-found-main">' +
          '<p>Page not found.</p>' +
          '<a href="#/" class="nav-link">(return to main page)</a>' +
        '</main>' +
        renderFooter() +
      '</div>';
  }

  /* ------------------------------------------------------------------------
     7. HASH ROUTER & INITIALIZATION
     ------------------------------------------------------------------------ */

  function normalizeHash() {
    let raw = window.location.hash || '';
    if (raw.startsWith('#')) {
      raw = raw.slice(1);
    }
    if (!raw || raw === '/') {
      return '/';
    }
    if (!raw.startsWith('/')) {
      raw = '/' + raw;
    }
    if (raw.length > 1 && raw.endsWith('/')) {
      raw = raw.slice(0, -1);
    }
    return raw;
  }

  function handleRouteChange() {
    clearCarouselInterval();
    const route = normalizeHash();
    window.scrollTo(0, 0);

    if (route === '/') {
      renderStartScreen();
      return;
    }

    if (route === '/projects/menu') {
      renderMenuPage();
      return;
    }

    if (route === '/about') {
      renderAboutPage();
      return;
    }

    const infoMatch = route.match(/^\/projects\/([1-5])\/information$/);
    if (infoMatch) {
      renderProjectInfoPage(infoMatch[1]);
      return;
    }

    const processMatch = route.match(/^\/projects\/(1|4)\/information\/process$/);
    if (processMatch) {
      renderProcessPage(processMatch[1]);
      return;
    }

    renderNotFound();
  }

  window.addEventListener('hashchange', handleRouteChange);
  window.addEventListener('DOMContentLoaded', function () {
    preloadStartScreenImages();
    handleRouteChange();
  });
})();
