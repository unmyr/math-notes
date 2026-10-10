BASE_DIR=../..
DOC_ROOT=..

DEST_DIR=$(BASE_DIR)/dist
DEST_SUBDIR=$(DEST_DIR)/differential-geometry
SRC_IMAGES_DIR=$(IMAGES_DIR)
DST_IMAGES_DIR=$(DEST_SUBDIR)/$(IMAGES_DIR)

include $(DOC_ROOT)/asciidoc.mk

HTML_LIST=\
$(DEST_SUBDIR)/atlas_rp1.html \
$(DEST_SUBDIR)/atlas_s1_transition.html \
$(DEST_SUBDIR)/atlas_s2_angular_coords.html \
$(DEST_SUBDIR)/atlas_s2_stereographic.html \
$(DEST_SUBDIR)/atlas.html \
$(DEST_SUBDIR)/coordinate_transformation.html \
$(DEST_SUBDIR)/tangent_vectors.html \
$(DEST_SUBDIR)/vector_field_commutator.html \
$(DEST_SUBDIR)/index.html

SUB_TARGETS=\
forms-coordinate-free

.PHONY: adoc $(SUB_TARGETS)

adoc: mkdir_and_copy $(HTML_LIST) $(SUB_TARGETS)

mkdir_and_copy:
	mkdir -p $(DEST_SUBDIR)
	test ! -d $(SRC_IMAGES_DIR) || test -d $(DST_IMAGES_DIR) || mkdir $(DST_IMAGES_DIR)
	test ! -d $(SRC_IMAGES_DIR) || cp $(CP_OPTS) $(SRC_IMAGES_DIR)/* $(DST_IMAGES_DIR)/

$(DEST_SUBDIR)/%.html: %.adoc $(DOC_ROOT)/attrs.adoc header.adoc
	asciidoctor --trace $(AD_OPTS_HTML5_ROUGE) -o "$@" "$<"

forms-coordinate-free:
	(cd $@ && make adoc)
