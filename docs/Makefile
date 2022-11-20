BASE_DIR=..
DOC_ROOT=.

DIST_DIR=$(BASE_DIR)/dist
SRC_IMAGES_DIR=$(IMAGES_DIR)
DST_IMAGES_DIR=$(DIST_DIR)/$(IMAGES_DIR)

include $(DOC_ROOT)/asciidoc.mk

HTML_LIST=\
$(DIST_DIR)/group.html \
$(DIST_DIR)/index.html

.PHONY: adoc mkdir_and_copy

adoc: mkdir_and_copy $(HTML_LIST)

mkdir_and_copy:
	mkdir -p $(DIST_DIR)
	test ! -d $(SRC_IMAGES_DIR) || test -d $(DST_IMAGES_DIR) || mkdir $(DST_IMAGES_DIR)
	test ! -d $(SRC_IMAGES_DIR) || cp $(CP_OPTS) $(SRC_IMAGES_DIR)/* $(DST_IMAGES_DIR)/

$(DIST_DIR)/%.html: %.adoc attrs.adoc header.adoc
	asciidoctor --trace $(AD_OPTS_HTML5_ROUGE) -o "$@" "$<"
