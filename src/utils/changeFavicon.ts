type icon = string;

export const changeFavicon = (icon: icon = '⚡') => {
    const link = document.querySelector('link[rel="icon"]');

    if (link) link.setAttribute('href', `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='85' font-size='85'>${icon}</text></svg>`);
};