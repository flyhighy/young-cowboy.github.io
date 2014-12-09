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

    $("#J_PostListWrap").on("scroll", function (e) {
        e.stopPropagation();
    });
});