BASE_DIR=..
DOC_ROOT=.

DIST_DIR=$(BASE_DIR)/dist
SRC_IMAGES_DIR=$(IMAGES_DIR)
DST_IMAGES_DIR=$(DIST_DIR)/$(IMAGES_DIR)

include $(DOC_ROOT)/asciidoc.mk

HTML_LIST=\
$(DIST_DIR)/group.html \
$(DIST_DIR)/plane_curve.html \
$(DIST_DIR)/index.html

SUB_TARGETS=\
algebra \
books

.PHONY: adoc mkdir_and_copy $(SUB_TARGETS)

adoc: mkdir_and_copy $(HTML_LIST) $(SUB_TARGETS)

mkdir_and_copy:
	mkdir -p $(DIST_DIR)
	test ! -d $(SRC_IMAGES_DIR) || test -d $(DST_IMAGES_DIR) || mkdir $(DST_IMAGES_DIR)
	test ! -d $(SRC_IMAGES_DIR) || cp $(CP_OPTS) $(SRC_IMAGES_DIR)/* $(DST_IMAGES_DIR)/

$(DIST_DIR)/%.html: %.adoc $(DOC_ROOT)/attrs.adoc header.adoc
	asciidoctor --trace $(AD_OPTS_HTML5_ROUGE) -o "$@" "$<"

algebra:
	(cd $@ && make adoc)

books:
	(cd $@ && make adoc)
