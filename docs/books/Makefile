BASE_DIR=../..
DOC_ROOT=..

DIST_DIR=$(BASE_DIR)/dist
DIST_SUBDIR=$(DIST_DIR)/books
SRC_IMAGES_DIR=$(IMAGES_DIR)
DST_IMAGES_DIR=$(DIST_SUBDIR)/$(IMAGES_DIR)

include $(DOC_ROOT)/asciidoc.mk

HTML_LIST=\
$(DIST_SUBDIR)/index.html

SUB_TARGETS=\
数学セミナー \
連続群論_上巻

.PHONY: adoc $(SUB_TARGETS)

adoc: mkdir_and_copy $(HTML_LIST) $(SUB_TARGETS)

mkdir_and_copy:
	mkdir -p $(DIST_SUBDIR)
	test ! -d $(SRC_IMAGES_DIR) || test -d $(DST_IMAGES_DIR) || mkdir $(DST_IMAGES_DIR)
	test ! -d $(SRC_IMAGES_DIR) || cp $(CP_OPTS) $(SRC_IMAGES_DIR)/* $(DST_IMAGES_DIR)/

$(DIST_SUBDIR)/%.html: %.adoc $(DOC_ROOT)/attrs.adoc header.adoc
	asciidoctor --trace $(AD_OPTS_HTML5_ROUGE) -o "$@" "$<"

数学セミナー:
	(cd $@ && make adoc)

連続群論_上巻:
	(cd $@ && make adoc)
