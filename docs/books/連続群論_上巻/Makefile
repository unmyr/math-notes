BASE_DIR=../../..
DOC_ROOT=../..

DEST_DIR=$(BASE_DIR)/dist
DEST_SUBDIR=$(DEST_DIR)/books/連続群論_上巻
SRC_IMAGES_DIR=$(IMAGES_DIR)
DST_IMAGES_DIR=$(DEST_SUBDIR)/$(IMAGES_DIR)

include $(DOC_ROOT)/asciidoc.mk

HTML_LIST=\
$(DEST_SUBDIR)/separation_axiom.html \
$(DEST_SUBDIR)/index.html

SUB_TARGETS=

.PHONY: adoc $(SUB_TARGETS)

adoc: mkdir_and_copy $(HTML_LIST) $(SUB_TARGETS)

mkdir_and_copy:
	mkdir -p $(DEST_SUBDIR)
	test ! -d $(SRC_IMAGES_DIR) || test -d $(DST_IMAGES_DIR) || mkdir $(DST_IMAGES_DIR)
	test ! -d $(DST_IMAGES_DIR) || cp $(CP_OPTS) $(SRC_IMAGES_DIR)/* $(DST_IMAGES_DIR)/

$(DEST_SUBDIR)/%.html: %.adoc $(DOC_ROOT)/attrs.adoc header.adoc
	asciidoctor --trace $(AD_OPTS_HTML5_ROUGE) -o "$@" "$<"
