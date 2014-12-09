//side
$(function () {
    $("#J_CategoryWrap").on("click", ".J_Category", function () {
        var node = $(this);
        var category = node.attr("data-category") || "all";
        var posts = $(".J_PostLinkWrap");

        node.addClass("active");
        node.siblings(".active").removeClass("active");

        if (category == "all") {
            posts.removeClass("hidden");
        } else {
            posts.addClass("hidden");
            posts.filter('[data-category="' + category + '"]').removeClass("hidden");
        }
    });

    $("#J_Arrow").on("click", function (e) {
        var aside = $("#J_AsideWrap");
        var node = $(this);

        if (node.hasClass("icon-arrow-full")) {
            aside.removeClass("aside-wrap-hidden");
            node.removeClass("icon-arrow-full");
        } else {
            aside.addClass("aside-wrap-hidden");
            node.addClass("icon-arrow-full");
        }
    });
});